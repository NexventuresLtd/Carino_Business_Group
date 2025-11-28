from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends, status
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
import os
import uuid
import logging
from io import BytesIO

# Try to import image processing libraries
try:
    from PIL import Image, ImageOps
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    logger.warning("PIL/Pillow not available. Image compression disabled.")

try:
    import cv2
    import numpy as np
    CV2_AVAILABLE = True
except ImportError:
    CV2_AVAILABLE = False
    logger.warning("OpenCV not available. Advanced image compression disabled.")

from db.connection import db_dependency
from models.userModels import Users as User
from models.serviceModel import Blog
from schemas.blog_schemas import (
    BlogResponse,
    CreateBlogRequest,
    UpdateBlogRequest
)
from db.VerifyToken import user_dependency

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/blogs", tags=["Blogs"])

# ---------------- IMAGE CONFIG ----------------
BLOG_IMAGE_FOLDER = "./static/images/blogs"
BLOG_BASE_URL = "/static/images/blogs/"
os.makedirs(BLOG_IMAGE_FOLDER, exist_ok=True)

# Image optimization settings
IMAGE_QUALITY = 85  # JPEG quality (0-100)
MAX_WIDTH = 1200    # Maximum width for images
MAX_HEIGHT = 1200   # Maximum height for images
THUMBNAIL_SIZE = (400, 400)  # Thumbnail dimensions

# ---------------- IMAGE HELPER FUNCTIONS ----------------
def get_image_extension_from_content_type(content_type: str) -> str:
    """Get image extension from content type"""
    if content_type == "image/jpeg":
        return "jpg"
    elif content_type == "image/png":
        return "png"
    elif content_type == "image/gif":
        return "gif"
    elif content_type == "image/webp":
        return "webp"
    elif content_type == "image/bmp":
        return "bmp"
    else:
        return "jpg"  # Default to jpg

def compress_image_pil(image_data: bytes, max_size=(MAX_WIDTH, MAX_HEIGHT), quality=IMAGE_QUALITY) -> bytes:
    """Compress image using PIL/Pillow"""
    try:
        with Image.open(BytesIO(image_data)) as img:
            # Convert to RGB if necessary (for JPEG)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too large
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save with compression
            output = BytesIO()
            img.save(output, format='JPEG', optimize=True, quality=quality, progressive=True)
            return output.getvalue()
    except Exception as e:
        logger.error(f"PIL compression failed: {str(e)}")
        return image_data  # Return original if compression fails

def compress_image_opencv(image_data: bytes, max_size=(MAX_WIDTH, MAX_HEIGHT), quality=IMAGE_QUALITY) -> bytes:
    """Compress image using OpenCV (better for photos)"""
    try:
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return image_data
        
        # Get current dimensions
        height, width = img.shape[:2]
        
        # Calculate resize dimensions
        if width > max_size[0] or height > max_size[1]:
            ratio = min(max_size[0] / width, max_size[1] / height)
            new_width = int(width * ratio)
            new_height = int(height * ratio)
            img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_AREA)
        
        # Encode with compression
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
        success, encoded_img = cv2.imencode('.jpg', img, encode_param)
        
        if success:
            return encoded_img.tobytes()
        else:
            return image_data
    except Exception as e:
        logger.error(f"OpenCV compression failed: {str(e)}")
        return image_data

def create_thumbnail(image_data: bytes, size=THUMBNAIL_SIZE) -> bytes:
    """Create a thumbnail version of the image"""
    try:
        with Image.open(BytesIO(image_data)) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Create thumbnail
            img.thumbnail(size, Image.Resampling.LANCZOS)
            
            output = BytesIO()
            img.save(output, format='JPEG', optimize=True, quality=80)
            return output.getvalue()
    except Exception as e:
        logger.error(f"Thumbnail creation failed: {str(e)}")
        return image_data

def optimize_image(image_data: bytes) -> bytes:
    """Optimize image based on available libraries"""
    original_size = len(image_data)
    
    # Choose compression method based on available libraries
    if CV2_AVAILABLE:
        compressed_data = compress_image_opencv(image_data)
    elif PIL_AVAILABLE:
        compressed_data = compress_image_pil(image_data)
    else:
        compressed_data = image_data  # No compression available
    
    compressed_size = len(compressed_data)
    compression_ratio = (original_size - compressed_size) / original_size * 100
    
    logger.info(f"Image compressed: {original_size/1024:.1f}KB -> {compressed_size/1024:.1f}KB ({compression_ratio:.1f}% reduction)")
    
    return compressed_data

def save_blog_image(image_file: UploadFile, blog_id: int) -> dict:
    """Save blog image with optimization and thumbnail creation"""
    try:
        # Read file content
        file_content = image_file.file.read()
        
        # Get file extension
        ext = get_image_extension_from_content_type(image_file.content_type)
        unique_id = uuid.uuid4().hex[:8]
        
        # Optimize main image
        optimized_data = optimize_image(file_content)
        
        # Save main image
        main_filename = f"blog_{blog_id}_{unique_id}.{ext}"
        main_filepath = os.path.join(BLOG_IMAGE_FOLDER, main_filename)
        
        with open(main_filepath, "wb") as f:
            f.write(optimized_data)
        
        # Create and save thumbnail
        thumbnail_url = None
        if PIL_AVAILABLE:
            thumbnail_data = create_thumbnail(file_content)
            thumb_filename = f"blog_{blog_id}_{unique_id}_thumb.{ext}"
            thumb_filepath = os.path.join(BLOG_IMAGE_FOLDER, thumb_filename)
            
            with open(thumb_filepath, "wb") as f:
                f.write(thumbnail_data)
            
            thumbnail_url = f"{BLOG_BASE_URL}{thumb_filename}"
        
        logger.info(f"Blog image saved: {main_filename} (thumbnail: {thumbnail_url})")
        
        return {
            "main_url": f"{BLOG_BASE_URL}{main_filename}",
            "thumbnail_url": thumbnail_url
        }
        
    except Exception as e:
        logger.error(f"Error saving blog image: {str(e)}")
        raise

def delete_blog_image(image_url: str):
    """Delete blog image file and its thumbnail"""
    if image_url and image_url.startswith(BLOG_BASE_URL):
        filename = image_url.replace(BLOG_BASE_URL, '')
        filepath = os.path.join(BLOG_IMAGE_FOLDER, filename)
        if os.path.exists(filepath):
            os.remove(filepath)
            logger.info(f"Deleted blog image file: {filename}")
        
        # Also try to delete thumbnail if it exists
        thumb_filename = filename.replace('.', '_thumb.')
        thumb_filepath = os.path.join(BLOG_IMAGE_FOLDER, thumb_filename)
        if os.path.exists(thumb_filepath):
            os.remove(thumb_filepath)
            logger.info(f"Deleted blog thumbnail file: {thumb_filename}")

# ---------------- AUTHENTICATION HELPER FUNCTIONS ----------------
def check_user_authentication(user: user_dependency):
    """Utility function to check if user is authenticated"""
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user

def check_admin_access(user: user_dependency):
    """Check if user has admin privileges"""
    user = check_user_authentication(user)
    if user["userType"] != "admin":
        raise HTTPException(
            status_code=403, 
            detail="Insufficient permissions. Admin access required."
        )
    return user

def get_creator_info(db: Session, user_id: int):
    """Get creator first name and last name from user_id"""
    if not user_id:
        return "", ""
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        return user.first_name, user.last_name
    return "", ""

# ---------------- BLOG ROUTES WITH IMAGE SUPPORT ----------------

# Get all blogs - accessible to all authenticated users
@router.get("/", response_model=List[BlogResponse])
async def get_all_blogs(
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    blogs = db.query(Blog).offset(skip).limit(limit).all()
    
    blog_responses = []
    for blog in blogs:
        creator_first_name, creator_last_name = get_creator_info(db, blog.user_id)
        
        blog_data = {
            "id": blog.id,
            "image": blog.image or "",
            "title": blog.title,
            "subtitle": blog.subtitle or "",
            "mainText": blog.mainText or "",
            "user_id": blog.user_id,
            "created_at":blog.created_at,
            "updated_at":blog.updated_at,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        blog_responses.append(BlogResponse(**blog_data))
    
    return blog_responses

# Get blog by ID - accessible to all authenticated users
@router.get("/{blog_id}", response_model=BlogResponse)
async def get_blog(
    blog_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_user_authentication(user)
    
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    creator_first_name, creator_last_name = get_creator_info(db, blog.user_id)
    
    blog_data = {
        "id": blog.id,
        "image": blog.image or "",
        "title": blog.title,
        "subtitle": blog.subtitle or "",
        "mainText": blog.mainText or "",
        "user_id": blog.user_id,
        "creator_first_name": creator_first_name,
        "creator_last_name": creator_last_name
    }
    
    return BlogResponse(**blog_data)

# Create blog - only for admin (with image upload)
@router.post("/", response_model=BlogResponse)
async def create_blog(
    db: db_dependency,
    user: user_dependency,
    title: str = Form(...),
    subtitle: str = Form(...),
    mainText: str = Form(...),
    image: Optional[UploadFile] = File(None)
):
    user = check_admin_access(user)
    
    # Verify user exists
    creator_user = db.query(User).filter(User.id == user["user_id"]).first()
    if not creator_user:
        raise HTTPException(status_code=400, detail="User not found")
    
    # Create blog first without image to get ID
    blog = Blog(
        title=title,
        subtitle=subtitle,
        mainText=mainText,
        user_id=user["user_id"]
    )
    
    db.add(blog)
    db.commit()
    db.refresh(blog)
    
    # Process image if provided
    image_url = None
    if image:
        try:
            saved_image = save_blog_image(image, blog.id)
            image_url = saved_image["main_url"]
            
            # Update blog with image URL
            blog.image = image_url
            db.commit()
            db.refresh(blog)
            
        except Exception as e:
            logger.error(f"Error processing blog image: {str(e)}")
            # Continue without image if processing fails
    
    blog_response_data = {
        "id": blog.id,
        "image": image_url or "",
        "title": blog.title,
        "subtitle": blog.subtitle,
        "mainText": blog.mainText,
        "user_id": blog.user_id,
        "creator_first_name": creator_user.first_name,
        "creator_last_name": creator_user.last_name
    }
    
    return BlogResponse(**blog_response_data)

# Update blog - only for admin (with image upload)
@router.put("/{blog_id}", response_model=BlogResponse)
async def update_blog(
    blog_id: int,
    db: db_dependency,
    user: user_dependency,
    title: Optional[str] = Form(None),
    subtitle: Optional[str] = Form(None),
    mainText: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    remove_image: bool = Form(False)
):
    user = check_admin_access(user)
    
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    creator_first_name, creator_last_name = get_creator_info(db, blog.user_id)
    
    # Handle image updates
    if remove_image and blog.image:
        # Delete existing image
        delete_blog_image(blog.image)
        blog.image = None
    
    elif image:
        # Delete old image if exists
        if blog.image:
            delete_blog_image(blog.image)
        
        # Save new image
        try:
            saved_image = save_blog_image(image, blog_id)
            blog.image = saved_image["main_url"]
        except Exception as e:
            logger.error(f"Error processing new blog image: {str(e)}")
            # Keep old image if new one fails
    
    # Update other fields if provided
    if title is not None:
        blog.title = title
    if subtitle is not None:
        blog.subtitle = subtitle
    if mainText is not None:
        blog.mainText = mainText
    
    db.commit()
    db.refresh(blog)
    
    blog_response_data = {
        "id": blog.id,
        "image": blog.image or "",
        "title": blog.title,
        "subtitle": blog.subtitle,
        "mainText": blog.mainText,
        "user_id": blog.user_id,
        "creator_first_name": creator_first_name,
        "creator_last_name": creator_last_name
    }
    
    return BlogResponse(**blog_response_data)

# Delete blog - only for admin
@router.delete("/{blog_id}")
async def delete_blog(
    blog_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Delete associated image files
    if blog.image:
        delete_blog_image(blog.image)
    
    db.delete(blog)
    db.commit()
    return {"message": "Blog deleted successfully"}

# Search blogs - accessible to all authenticated users
@router.get("/search/", response_model=List[BlogResponse])
async def search_blogs(
    query: str,
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    blogs = db.query(Blog).filter(
        or_(
            Blog.title.ilike(f"%{query}%"),
            Blog.subtitle.ilike(f"%{query}%"),
            Blog.mainText.ilike(f"%{query}%")
        )
    ).offset(skip).limit(limit).all()
    
    blog_responses = []
    for blog in blogs:
        creator_first_name, creator_last_name = get_creator_info(db, blog.user_id)
        
        blog_data = {
            "id": blog.id,
            "image": blog.image or "",
            "title": blog.title,
            "subtitle": blog.subtitle or "",
            "mainText": blog.mainText or "",
            "user_id": blog.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        blog_responses.append(BlogResponse(**blog_data))
    
    return blog_responses

# Get blogs created by current user
@router.get("/my-blogs/", response_model=List[BlogResponse])
async def get_my_blogs(
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    blogs = db.query(Blog).filter(
        Blog.user_id == user["user_id"]
    ).offset(skip).limit(limit).all()
    
    blog_responses = []
    for blog in blogs:
        creator_first_name, creator_last_name = get_creator_info(db, blog.user_id)
        
        blog_data = {
            "id": blog.id,
            "image": blog.image or "",
            "title": blog.title,
            "subtitle": blog.subtitle or "",
            "mainText": blog.mainText or "",
            "user_id": blog.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        blog_responses.append(BlogResponse(**blog_data))
    
    return blog_responses

# Update blog image only
@router.patch("/{blog_id}/image")
async def update_blog_image(
    blog_id: int,
    db: db_dependency,
    user: user_dependency,
    image: UploadFile = File(...)
):
    user = check_admin_access(user)
    
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Delete old image if exists
    if blog.image:
        delete_blog_image(blog.image)
    
    # Save new image
    try:
        saved_image = save_blog_image(image, blog_id)
        blog.image = saved_image["main_url"]
        db.commit()
        db.refresh(blog)
        
        return {"message": "Blog image updated successfully", "image_url": blog.image}
        
    except Exception as e:
        logger.error(f"Error updating blog image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update blog image: {str(e)}")

# Remove blog image only
@router.delete("/{blog_id}/image")
async def remove_blog_image(
    blog_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    if not blog.image:
        raise HTTPException(status_code=400, detail="Blog has no image to remove")
    
    # Delete image files
    delete_blog_image(blog.image)
    
    # Update blog record
    blog.image = None
    db.commit()
    
    return {"message": "Blog image removed successfully"}