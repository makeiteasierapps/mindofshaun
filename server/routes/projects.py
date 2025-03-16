from fastapi import APIRouter, HTTPException, Depends, Query, status, Request, UploadFile, File
from typing import List, Optional, Annotated, Any
from datetime import datetime
from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator
import logging
import os
import shutil
from pathlib import Path
import uuid

# Set up logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api/projects", tags=["projects"])

# Custom type for handling ObjectId
def validate_object_id(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str):
        if ObjectId.is_valid(v):
            return v
    raise ValueError("Invalid ObjectId")

PyObjectId = Annotated[str, BeforeValidator(validate_object_id)]

# Define models for technology items
class TechnologyItem(BaseModel):
    name: str

# Define models for project images
class ProjectImage(BaseModel):
    image: str  # Path to the image
    description: str

# Define models for project details
class ProjectDetails(BaseModel):
    title: str
    description: str
    clientCode: str | None = None
    serverCode: str | None = None

# Base model for projects
class ProjectBase(BaseModel):
    images: List[ProjectImage]
    clientTech: List[TechnologyItem]
    serverTech: List[TechnologyItem]
    project_details: ProjectDetails
    published: bool = False

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    images: List[ProjectImage] | None = None
    clientTech: List[TechnologyItem] | None = None
    serverTech: List[TechnologyItem] | None = None
    project_details: ProjectDetails | None = None
    published: bool | None = None

class ProjectInDB(ProjectBase):
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_encoders = {
            ObjectId: str
        }

class ProjectResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    images: List[ProjectImage]
    clientTech: List[TechnologyItem]
    serverTech: List[TechnologyItem]
    ProjectDetails: ProjectDetails
    published: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {
            ObjectId: str
        }
        
    @classmethod
    def from_mongo(cls, data):
        if not data:
            return data
        
        # Convert project_details to ProjectDetails if needed
        if "project_details" in data and "ProjectDetails" not in data:
            data["ProjectDetails"] = data.pop("project_details")
            
        return cls(**data)

async def get_projects_collection(request: Request):
    return request.app.state.mongo_client.db.projects

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate, collection=Depends(get_projects_collection)):
    """Create a new project"""
    project_dict = project.dict()
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    # Rename project_details to ProjectDetails for backward compatibility with frontend
    if "project_details" in project_dict:
        project_dict["ProjectDetails"] = project_dict.pop("project_details")
    
    result = await collection.insert_one(project_dict)
    
    created_project = await collection.find_one({"_id": result.inserted_id})
    return ProjectResponse.from_mongo(created_project)

@router.get("", response_model=List[ProjectResponse])
async def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    published: bool | None = None,
    collection=Depends(get_projects_collection)
):
    """Get all projects with optional filtering"""
    query = {}
    logger.info(f"published:")
    if published is not None:
        query["published"] = published
    
    cursor = collection.find(query).skip(skip).limit(limit)
    projects = await cursor.to_list(length=limit)
    logger.info(f"projects: {projects}")
    return [ProjectResponse.from_mongo(project) for project in projects]

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, collection=Depends(get_projects_collection)):
    """Get a specific project by ID"""
    try:
        project_id_obj = ObjectId(project_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID format")
    
    project = await collection.find_one({"_id": project_id_obj})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return ProjectResponse.from_mongo(project)

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str, 
    update_data: ProjectUpdate,
    collection=Depends(get_projects_collection)
):
    """Update a project"""
    try:
        project_id_obj = ObjectId(project_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID format")
    
    # Check if project exists
    project = await collection.find_one({"_id": project_id_obj})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Filter out None values
    update_dict = {k: v for k, v in update_data.dict(exclude_unset=True).items() if v is not None}
    
    # Rename project_details to ProjectDetails for backward compatibility with frontend
    if "project_details" in update_dict:
        update_dict["ProjectDetails"] = update_dict.pop("project_details")
    
    if update_dict:
        update_dict["updated_at"] = datetime.utcnow()
        
        await collection.update_one(
            {"_id": project_id_obj},
            {"$set": update_dict}
        )
    
    updated_project = await collection.find_one({"_id": project_id_obj})
    return ProjectResponse.from_mongo(updated_project)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str, collection=Depends(get_projects_collection)):
    """Delete a project"""
    try:
        project_id_obj = ObjectId(project_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID format")
    
    # Check if project exists
    project = await collection.find_one({"_id": project_id_obj})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Delete the project
    await collection.delete_one({"_id": project_id_obj})
    
    return None

@router.post("/upload-image")
async def upload_project_image(file: UploadFile = File(...)):
    """Upload a project image"""
    # Define base path for media storage
    is_local = os.getenv("LOCAL_DEV")
    base_path = '/mnt/media_storage' if not is_local else os.path.join(os.getcwd(), 'media_storage')
    print(f"base_path: {base_path}")
    
    # Create projects directory if it doesn't exist
    projects_dir = os.path.join(base_path, "projects")
    os.makedirs(projects_dir, exist_ok=True)
    
    # Generate a unique filename
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(projects_dir, unique_filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return the relative path to be stored in the database
    relative_path = f"/media/projects/{unique_filename}"
    return {"filename": unique_filename, "path": relative_path} 