from typing import List
from pydantic import BaseModel, Field
from bson import ObjectId
from datetime import datetime
from server.models.utils import PyObjectId

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
    clientTech: List[str] = []
    serverTech: List[str] = []
    published: bool = False

# Base model for projects
class ProjectBase(BaseModel):
    images: List[ProjectImage]
    project_details: ProjectDetails

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    images: List[ProjectImage] | None = None
    project_details: ProjectDetails | None = None

class ProjectResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    images: List[ProjectImage]
    project_details: ProjectDetails
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
            
        return cls(**data)