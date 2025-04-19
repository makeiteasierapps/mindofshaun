from fastapi import APIRouter, Depends, Request
from server.utils.ai_helpers import try_process_ai_request
from server.models.blog import BlogContentOnly, BlogContentWithTone
from server.agents.blog.agent_blog import (
    organize_thoughts,
    edit_blog_content,
    generate_titles,
    expand_blog_content,
    generate_research_directions,
    generate_conclusion,
    generate_introduction,
    adjust_tone,
    prepare_publishing_package
)

router = APIRouter(prefix="/api/blog/ai", tags=["blog-ai"])

async def get_blog_collection(request: Request):
    return request.app.state.mongo_client.get_blog_posts_collection()

@router.post("/organize-thoughts")
async def organize(request: BlogContentOnly, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        organize_thoughts,
        result_key="organizedThoughts",
        collection=collection,
        post_id=request.post_id,
        raw_thoughts=request.blog_content  # <- Function-specific kwarg
    )

@router.post("/edit-content")
async def edit(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        edit_blog_content,
        result_key="editedContent",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )

@router.post("/generate-titles")
async def titles(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        generate_titles,
        result_key="titles",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )


@router.post("/expand-blog-content")
async def expand(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        expand_blog_content,
        result_key="expandedPoints",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )

@router.post("/generate-research-directions")
async def research(request: BlogContentOnly, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        generate_research_directions,
        result_key="researchDirections",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content
    )


@router.post("/adjust-tone")
async def tone(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        adjust_tone,
        result_key="adjustedTone",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )


@router.post("/generate-conclusion")
async def conclusion(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        generate_conclusion,
        result_key="conclusion",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )

@router.post("/generate-introduction")
async def intro(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        generate_introduction,
        result_key="introduction",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )

@router.post("/prepare-publishing-package")
async def publishing(request: BlogContentWithTone, collection=Depends(get_blog_collection)):
    return await try_process_ai_request(
        prepare_publishing_package,
        result_key="publishingPackage",
        collection=collection,
        post_id=request.post_id,
        blog_content=request.blog_content,
        tone=request.tone
    )