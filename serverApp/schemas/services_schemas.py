from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class ServiceResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    price: int
    features: Optional[str] = None
    status: str
    created_at: str
    updated_at: str
    user_id: Optional[int] = None
    creator_first_name: str
    creator_last_name: str
    
    model_config = ConfigDict(from_attributes=True)

class CreateServiceRequest(BaseModel):
    title: str
    description: Optional[str] = None
    price: int
    features: Optional[str] = None
    status: Optional[str] = "active"

class UpdateServiceRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    features: Optional[str] = None
    status: Optional[str] = None