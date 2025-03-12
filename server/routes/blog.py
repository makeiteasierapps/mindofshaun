from fastapi import APIRouter, HTTPException, Depends, Query, status, Request
from typing import List, Optional, Annotated, Any
from datetime import datetime
from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator
import logging

from server.agents.blog.agent_blog import (
    organize_thoughts,
    edit_content,
    generate_titles,
    expand_brief_points,
    generate_research_directions,
    adjust_tone,
    generate_conclusion,
    generate_introduction,
    prepare_publishing_package
)

# Set up logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api/blog", tags=["blog"])

# Custom type for handling ObjectId
def validate_object_id(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str):
        if ObjectId.is_valid(v):
            return v
    raise ValueError("Invalid ObjectId")

PyObjectId = Annotated[str, BeforeValidator(validate_object_id)]

class BlogPostBase(BaseModel):
    title: str
    content: str
    summary: Optional[str] = None
    author: Optional[str] = None
    tags: List[str] = []
    published: bool = False

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    summary: Optional[str] = None
    author: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None

class BlogPostInDB(BlogPostBase):
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }

class BlogPostResponse(BlogPostInDB):
    pass

# Helper function to get MongoDB collection
async def get_blog_collection(request: Request):
    return request.app.state.mongo_client.db.blog_posts

# Routes
@router.post("/posts", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_blog_post(post: BlogPostCreate, collection=Depends(get_blog_collection)):
    """Create a new blog post"""
    logger.info(f"Creating new blog post: {post.title}")
    
    new_post = post.dict()
    new_post["created_at"] = datetime.utcnow()
    new_post["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(new_post)
    
    created_post = await collection.find_one({"_id": result.inserted_id})
    return created_post

@router.get("/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    tag: Optional[str] = None,
    published: Optional[bool] = None,
    collection=Depends(get_blog_collection)
):
    """Get all blog posts with optional filtering"""
    logger.info(f"Getting blog posts with skip={skip}, limit={limit}, tag={tag}, published={published}")
    
    # Build query filter
    query = {}
    if tag:
        query["tags"] = tag
    if published is not None:
        query["published"] = published
    
    # Execute query
    cursor = collection.find(query).skip(skip).limit(limit).sort("created_at", -1)
    posts = await cursor.to_list(length=limit)
    
    return posts

@router.get("/posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(post_id: str, collection=Depends(get_blog_collection)):
    """Get a specific blog post by ID"""
    logger.info(f"Getting blog post with ID: {post_id}")
    
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID format")
    
    post = await collection.find_one({"_id": ObjectId(post_id)})
    
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return post

@router.put("/posts/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: str, 
    update_data: BlogPostUpdate,
    collection=Depends(get_blog_collection)
):
    """Update a blog post"""
    logger.info(f"Updating blog post with ID: {post_id}")
    
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID format")
    
    # Filter out None values
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    # Always update the updated_at timestamp
    update_dict["updated_at"] = datetime.utcnow()
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No valid update data provided")
    
    result = await collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    updated_post = await collection.find_one({"_id": ObjectId(post_id)})
    return updated_post

@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog_post(post_id: str, collection=Depends(get_blog_collection)):
    """Delete a blog post"""
    logger.info(f"Deleting blog post with ID: {post_id}")
    
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID format")
    
    result = await collection.delete_one({"_id": ObjectId(post_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return None

@router.get("/tags", response_model=List[str])
async def get_blog_tags(collection=Depends(get_blog_collection)):
    """Get all unique tags used in blog posts"""
    logger.info("Getting all unique blog tags")
    
    # Aggregate to get unique tags
    pipeline = [
        {"$unwind": "$tags"},
        {"$group": {"_id": "$tags"}},
        {"$sort": {"_id": 1}}
    ]
    
    cursor = collection.aggregate(pipeline)
    results = await cursor.to_list(length=100)
    
    return [doc["_id"] for doc in results]

# AI Blog Assistant Endpoints
class OrganizeThoughtsRequest(BaseModel):
    raw_thoughts: str

class EditContentRequest(BaseModel):
    draft_content: str
    tone: str

class GenerateTitlesRequest(BaseModel):
    blog_content: str
    topic: str

class ExpandBriefPointsRequest(BaseModel):
    brief_points: str
    desired_tone: str

class GenerateResearchDirectionsRequest(BaseModel):
    blog_topic: str

class AdjustToneRequest(BaseModel):
    content: str
    target_tone: str

class GenerateConclusionRequest(BaseModel):
    blog_content: str

class GenerateIntroductionRequest(BaseModel):
    content: str
    tone: str

class PreparePublishingPackageRequest(BaseModel):
    blog_content: str

@router.post("/ai/organize-thoughts")
async def api_organize_thoughts(request: OrganizeThoughtsRequest):
    """Organize unorganized thoughts into structured blog ideas with writing prompts."""
    try:
        result = organize_thoughts(request.raw_thoughts)
        return result
    except Exception as e:
        logger.error(f"Error organizing thoughts: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/edit-content")
async def api_edit_content(request: EditContentRequest):
    """Review blog content and provide specific improvement suggestions."""
    try:
        result = edit_content(request.draft_content, request.tone)
        return result
    except Exception as e:
        logger.error(f"Error editing content: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/generate-titles")
async def api_generate_titles(request: GenerateTitlesRequest):
    """Generate engaging blog titles from content or topic."""
    try:
        result = generate_titles(request.blog_content, "professional")
        return result
    except Exception as e:
        logger.error(f"Error generating titles: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/expand-brief-points")
async def api_expand_brief_points(request: ExpandBriefPointsRequest):
    """Expand brief points into fully developed paragraphs."""
    try:
        result = expand_brief_points(request.brief_points, request.desired_tone)
        return result
    except Exception as e:
        logger.error(f"Error expanding brief points: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/generate-research-directions")
async def api_generate_research_directions(request: GenerateResearchDirectionsRequest):
    """Suggest research directions to strengthen blog content."""
    try:
        result = generate_research_directions(request.blog_topic)
        return result
    except Exception as e:
        logger.error(f"Error generating research directions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/adjust-tone")
async def api_adjust_tone(request: AdjustToneRequest):
    """Adjust the tone of content to match your brand voice."""
    try:
        result = adjust_tone(request.content, request.target_tone)
        return result
    except Exception as e:
        logger.error(f"Error adjusting tone: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/generate-conclusion")
async def api_generate_conclusion(request: GenerateConclusionRequest):
    """Create compelling conclusions that summarize and drive action."""
    try:
        result = generate_conclusion(request.blog_content, "professional")
        return result
    except Exception as e:
        logger.error(f"Error generating conclusion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/generate-introduction")
async def api_generate_introduction(request: GenerateIntroductionRequest):
    """Craft engaging introductions that hook readers immediately."""
    try:
        result = generate_introduction(request.content, request.tone)
        return result
    except Exception as e:
        logger.error(f"Error generating introduction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ai/prepare-publishing-package")
async def api_prepare_publishing_package(request: PreparePublishingPackageRequest):
    """Create a complete publishing package with titles, summary, and tags."""
    try:
        result = prepare_publishing_package(request.blog_content, "professional")
        return result
    except Exception as e:
        logger.error(f"Error preparing publishing package: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
