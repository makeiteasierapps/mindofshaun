from fastapi import APIRouter, Depends, HTTPException, Query, status, Request
from bson import ObjectId
from typing import List, Optional
import logging

from server.models.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from server.services.blog_service import create_blog, update_blog

router = APIRouter(prefix="/api/blog", tags=["blog"])
logger = logging.getLogger(__name__)

async def get_blog_collection(request: Request):
    return request.app.state.mongo_client.get_blog_posts_collection()

@router.post("/posts", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(post: BlogPostCreate, collection=Depends(get_blog_collection)):
    logger.info("Creating blog post: %s", post.title)
    created = await create_blog(post.dict(), collection)
    return created


@router.get("/posts", response_model=List[BlogPostResponse])
async def list_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    tag: Optional[str] = None,
    published: Optional[bool] = None,
    collection=Depends(get_blog_collection),
):
    query = {}
    if tag:
        query["tags"] = tag
    if published is not None:
        query["published"] = published

    cursor = collection.find(query).skip(skip).limit(limit).sort("created_at", -1)
    return await cursor.to_list(length=limit)


@router.get("/posts/{post_id}", response_model=BlogPostResponse)
async def get_post(post_id: str, collection=Depends(get_blog_collection)):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    post = await collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    return post


@router.put("/posts/{post_id}", response_model=BlogPostResponse)
async def update_post(post_id: str, data: BlogPostUpdate, collection=Depends(get_blog_collection)):
    return await update_blog(post_id, data.dict(), collection)


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(post_id: str, collection=Depends(get_blog_collection)):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    result = await collection.delete_one({"_id": ObjectId(post_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return None


@router.get("/tags", response_model=List[str])
async def unique_tags(collection=Depends(get_blog_collection)):
    pipeline = [
        {"$unwind": "$tags"},
        {"$group": {"_id": "$tags"}},
        {"$sort": {"_id": 1}}
    ]
    cursor = collection.aggregate(pipeline)
    results = await cursor.to_list(length=100)
    return [doc["_id"] for doc in results]


@router.get("/posts/{post_id}/ai-results")
async def get_ai_results(post_id: str, collection=Depends(get_blog_collection)):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    post = await collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    return post.get("ai_results", {})
