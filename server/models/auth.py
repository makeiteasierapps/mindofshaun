from typing import Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
import os
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/login")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AdminBase(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None

class AdminCreate(AdminBase):
    password: str

class Admin(AdminBase):
    disabled: Optional[bool] = None

class AdminInDB(Admin):
    hashed_password: str

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(
    request: Request,
    token: str = Depends(oauth2_scheme)
):
    logger.info(f"Token: {token}")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.info(f"Payload: {payload}")
        username: str = payload.get("sub")
        logger.info(f"Username: {username}")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    # Get database access from the request state
    db = request.app.state.mongo_client.db
    
    # Fetch the admin from the database
    admin = await db.admins.find_one({"username": token_data.username})
    logger.info(f"Admin: {admin}")
    
    # If no admin found with this username, raise exception
    if not admin:
        logger.warning(f"Authentication attempt with valid token but unknown username: {token_data.username}")
        raise credentials_exception
    
    # Return admin data - this could be expanded to include roles, permissions, etc.
    return token_data