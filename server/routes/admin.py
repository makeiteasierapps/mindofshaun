from fastapi import APIRouter, HTTPException, Depends, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from server.models.auth import (
    Admin, AdminCreate, Token, 
    create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES,
)
from passlib.context import CryptContext

router = APIRouter(prefix="/admin", tags=["Admin"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def authenticate_admin(username: str, password: str, db):
    admin = await db.admins.find_one({"username": username})
    if not admin:
        return False
    if not verify_password(password, admin["hashed_password"]):
        return False
    return admin

@router.post("/login", response_model=Token)
async def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    db = request.app.state.mongo_client.db
    admin = await authenticate_admin(form_data.username, form_data.password, db)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", response_model=Admin)
async def register_admin(admin: AdminCreate, request: Request):
    db = request.app.state.mongo_client.db
    # Check if admin already exists
    existing_admin = await db.admins.find_one({"username": admin.username})
    if existing_admin:
        raise HTTPException(
            status_code=400,
            detail="Username already registered"
        )
    
    # Create new admin
    hashed_password = get_password_hash(admin.password)
    admin_dict = admin.dict()
    admin_dict.pop("password")
    admin_dict["hashed_password"] = hashed_password
    
    result = await db.admins.insert_one(admin_dict)
    
    created_admin = await db.admins.find_one({"_id": result.inserted_id})
    return created_admin

@router.get("/dashboard")
async def get_dashboard(request: Request):
    """
    Retrieve dashboard data for admin.
    Returns counts of services, projects, testimonials, unread messages,
    and a list of recent messages.
    """
    db = request.app.state.mongo_client.db
    
    # Get counts from each collection
    services_count = await db.services.count_documents({})
    projects_count = await db.projects.count_documents({})
    testimonials_count = await db.testimonials.count_documents({})
    
    # Get contact message information
    unread_messages_count = await db.contact_messages.count_documents({"is_read": False})
    
    # Get 4 most recent messages - similar to what frontend dashboard displays
    recent_messages_cursor = db.contact_messages.find().sort("created_at", -1).limit(4)
    recent_messages = await recent_messages_cursor.to_list(length=4)
    
    # Format recent messages for the response
    formatted_messages = []
    for msg in recent_messages:
        formatted_messages.append({
            "id": str(msg.get("_id")),
            "name": msg.get("name"),
            "email": msg.get("email"),
            "date": msg.get("created_at").strftime("%Y-%m-%d"),
            "read": msg.get("is_read", False)
        })
    
    # Compile dashboard data
    dashboard_data = {
        "totalServices": services_count,
        "totalProjects": projects_count,
        "totalTestimonials": testimonials_count,
        "unreadMessages": unread_messages_count,
        "recentMessages": formatted_messages
    }
    
    return dashboard_data 