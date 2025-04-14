import json
import logging
from datetime import datetime
from bson import ObjectId
from typing import List
from fastapi import APIRouter, HTTPException, Depends, status, Request, UploadFile, File, Form
from server.services.media_service import MediaService
from server.models.projects import ProjectResponse

# Set up logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api/projects", tags=["projects"])

async def get_projects_collection(request: Request):
    return request.app.state.mongo_client.db.projects

async def process_project_images_from_form(form_data, project_dict):
    """
    Process images directly from the form data
    """
    result = project_dict.copy()
    
    # Extract image files from form data
    image_keys = [k for k in form_data.keys() if k.startswith('image_') and not k.endswith('_description')]
    
    if image_keys:
        uploaded_images = []
        for key in image_keys:
            file = form_data[key]
            if not isinstance(file, UploadFile):
                continue
                
            # Extract the index from the key (image_0, image_1, etc.)
            index = key.split('_')[1]
            description_key = f"image_{index}_description"
            description = form_data.get(description_key, "")
            
            # Upload the image and get the path
            upload_result = await MediaService.upload_project_image(file)
            uploaded_images.append({
                "image": upload_result["path"],
                "description": description
            })
        
        # Combine with any existing images from the project data
        if "images" in result:
            result["images"].extend(uploaded_images)
        else:
            result["images"] = uploaded_images
    
    # Handle image deletions if specified
    if "imagesToDelete" in result and result["imagesToDelete"]:
        # Try to delete the files
        for image_path in result["imagesToDelete"]:
            await MediaService.delete_project_image(image_path)
        
        # Remove deleted images from the database record
        if "images" in result:
            result["images"] = [
                img for img in result["images"] 
                if img["image"] not in result["imagesToDelete"]
            ]
        
        # Remove temporary field
        del result["imagesToDelete"]
    
    return result

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    projectData: str = Form(...),
    imageDescriptions: str = Form(None),
    image_files: List[UploadFile] = File(None),
    collection=Depends(get_projects_collection)
):
    """Create a new project with image uploads"""
    try:
        # Parse the project data
        project_dict = json.loads(projectData)

        # Parse image descriptions if provided
        descriptions = []
        if imageDescriptions:
            descriptions = json.loads(imageDescriptions)
        
        # Process images - match files with descriptions based on index
        if image_files and len(image_files) > 0:
            uploaded_images = []
            
            for i, file in enumerate(image_files):
                # Get description from the list if available
                description = descriptions[i] if i < len(descriptions) else ""
                
                # Upload the image
                upload_result = await MediaService.upload_project_image(file)
                uploaded_images.append({
                    "image": upload_result["path"],
                    "description": description
                })
            
            # Add the new images
            if "images" in project_dict:
                project_dict["images"].extend(uploaded_images)
            else:
                project_dict["images"] = uploaded_images
        
        # Add timestamps
        project_dict["created_at"] = datetime.utcnow()
        project_dict["updated_at"] = datetime.utcnow()
        
        # Ensure consistent field naming (use project_details)
        if "ProjectDetails" in project_dict and "project_details" not in project_dict:
            project_dict["project_details"] = project_dict.pop("ProjectDetails")
        
        # Insert the new project
        result = await collection.insert_one(project_dict)
        
        created_project = await collection.find_one({"_id": result.inserted_id})
        return ProjectResponse.from_mongo(created_project)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create project: {str(e)}")

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str, 
    projectData: str = Form(...),
    imageDescriptions: str = Form(None),
    image_files: List[UploadFile] = File(None),
    collection=Depends(get_projects_collection)
):
    """Update a project with image uploads"""
    try:
        project_id_obj = ObjectId(project_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid project ID format")
    
    # Check if project exists
    project = await collection.find_one({"_id": project_id_obj})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    try:
        # Parse the project data
        update_dict = json.loads(projectData)
        
        # Parse image descriptions if provided
        descriptions = []
        if imageDescriptions:
            descriptions = json.loads(imageDescriptions)
        
        # Process images - match files with descriptions based on index
        if image_files and len(image_files) > 0:
            uploaded_images = []
            
            for i, file in enumerate(image_files):
                # Get description from the list if available
                description = descriptions[i] if i < len(descriptions) else ""
                
                # Upload the image
                upload_result = await MediaService.upload_project_image(file)
                uploaded_images.append({
                    "image": upload_result["path"],
                    "description": description
                })
            
            # Add the new images to existing ones
            if "images" in update_dict:
                update_dict["images"].extend(uploaded_images)
            else:
                update_dict["images"] = uploaded_images
        
        # Handle image deletions
        if "imagesToDelete" in update_dict and update_dict["imagesToDelete"]:
            for image_path in update_dict["imagesToDelete"]:
                await MediaService.delete_project_image(image_path)
            
            if "images" in update_dict:
                update_dict["images"] = [
                    img for img in update_dict["images"] 
                    if img["image"] not in update_dict["imagesToDelete"]
                ]
            
            del update_dict["imagesToDelete"]
        
        # Update the project
        if "_id" in update_dict:
            update_dict.pop("_id")
        
        update_dict["updated_at"] = datetime.utcnow()
        
        await collection.update_one(
            {"_id": project_id_obj},
            {"$set": update_dict}
        )
    
        updated_project = await collection.find_one({"_id": project_id_obj})
        return ProjectResponse.from_mongo(updated_project)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to update project: {str(e)}")

@router.get("", response_model=List[ProjectResponse])
async def get_projects(
    collection=Depends(get_projects_collection)
):
    """Get all projects"""

    cursor = collection.find()
    projects = await cursor.to_list(length=None)

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
