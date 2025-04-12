import io
import os
from typing import Dict
import logging
import uuid
from fastapi import UploadFile, HTTPException
from PIL import Image

logger = logging.getLogger(__name__)

class MediaService:
    @staticmethod
    async def upload_project_image(file: UploadFile) -> Dict[str, str]:
        """Upload a project image and return its details
        
        Args:
            file: The uploaded file object
            
        Returns:
            Dict with filename and relative path information
        """

        try:
            if not file:
                logger.error("No file provided for upload")
                raise HTTPException(status_code=400, detail="No file provided")
                
            # Define base path for media storage
            is_local = os.getenv("LOCAL_DEV", "false").lower() in ("true")
            
            base_path = '/mnt/media_storage/mindofshaun/projects' if not is_local else os.path.join(os.getcwd(), 'public/mnt/media_storage/mindofshaun/projects')
            logger.info("Using storage base path: %s", base_path)
            
            # Create projects directory if it doesn't exist
            projects_dir = os.path.join(base_path, "projects")
            os.makedirs(projects_dir, exist_ok=True)
            
            # Read the file content
            contents = await file.read()
            
            # Open the image using PIL
            original_img = Image.open(io.BytesIO(contents))
            
            # Convert to RGB if needed (WebP doesn't support RGBA in some cases)
            if original_img.mode == 'RGBA':
                original_img = original_img.convert('RGBA')
            else:
                original_img = original_img.convert('RGB')
            
            # Generate a unique filename with .webp extension
            original_filename = file.filename or "unnamed_file"
            unique_filename = f"{uuid.uuid4()}.webp"
            file_path = os.path.join(projects_dir, unique_filename)
            
            logger.info("Converting and saving file %s as %s", original_filename, unique_filename)
            
            # Save as WebP with good quality (85%)
            original_img.save(file_path, "WEBP", quality=85, method=6)
            logger.info("File converted and saved successfully. Relative path: %s", f'{base_path}/projects/{unique_filename}')

            if is_local:
                base_path = '/' + base_path.split('public/')[1]
            
            return {"filename": unique_filename, "path": f"{base_path}/projects/{unique_filename}"}
        except Exception as e:
            logger.error("Failed to upload file: %s", str(e))
            raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
    
    @staticmethod
    async def delete_project_image(file_path: str) -> bool:
        """Delete a project image file
        
        Args:
            file_path: The path to the file to delete
            
        Returns:
            Boolean indicating success or failure
        """
        try:
            if not file_path:
                logger.warning("No file path provided for deletion")
                return False
            
            # Determine if we're in local or production environment
            is_local = os.getenv("LOCAL_DEV", "false").lower() in ("true")
            
            # Get the filename from the path
            filename = file_path.split('/')[-1]
            
            # Determine the actual file path on disk
            if is_local:
                # For local development, adjust the path
                actual_path = os.path.join(os.getcwd(), 'public/mnt/media_storage/dn_right/projects', filename)
            else:
                # For production
                actual_path = os.path.join('/mnt/media_storage/dn_right/projects', filename)
            
            logger.info("Attempting to delete file at: %s", actual_path)
            
            # Check if file exists before deleting
            if os.path.exists(actual_path):
                os.remove(actual_path)
                logger.info("Successfully deleted file: %s", filename)
                return True
            else:
                logger.warning("File not found for deletion: %s", actual_path)
                return False
                
        except Exception as e:
            logger.error("Failed to delete file %s: %s", file_path, str(e))
            return False
