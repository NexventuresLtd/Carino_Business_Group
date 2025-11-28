from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class BlogResponse(BaseModel):
    id: int
    image: Optional[str] = None
    title: str
    subtitle: Optional[str] = None
    mainText: Optional[str] = None
    user_id: Optional[int] = None
    creator_first_name: str
    creator_last_name: str
    created_at:datetime
    updated_at:datetime
    
    model_config = ConfigDict(from_attributes=True)

class CreateBlogRequest(BaseModel):
    image: Optional[str] = None
    title: str
    subtitle: Optional[str] = None
    mainText: Optional[str] = None

class UpdateBlogRequest(BaseModel):
    image: Optional[str] = None
    title: Optional[str] = None
    subtitle: Optional[str] = None
    mainText: Optional[str] = None