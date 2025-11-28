from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional

class ClientResponse(BaseModel):
    id: int
    name: Optional[str] = None
    client_type: Optional[str] = None
    phone: Optional[str] = None
    email: str
    num_projects: Optional[str] = None
    user_id: Optional[int] = None
    creator_first_name: str
    creator_last_name: str
    
    model_config = ConfigDict(from_attributes=True)

class CreateClientRequest(BaseModel):
    name: Optional[str] = None
    client_type: Optional[str] = None
    phone: Optional[str] = None
    email: EmailStr
    num_projects: Optional[str] = None

class UpdateClientRequest(BaseModel):
    name: Optional[str] = None
    client_type: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    num_projects: Optional[str] = None