from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime
from server.models.utils import PyObjectId

# Request models
class BlogContentOnly(BaseModel):
    blog_content: str
    post_id: Optional[str] = None

class BlogContentWithTone(BaseModel):
    blog_content: str
    tone: str
    post_id: Optional[str] = None

# Basic blog post models
class BlogPostBase(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    author: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None
    featured_image: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    author: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None
    featured_image: Optional[str] = None

# Response model
class BlogPostResponse(BlogPostBase):
    id: PyObjectId = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    ai_results: Optional[dict] = {}

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
        }
