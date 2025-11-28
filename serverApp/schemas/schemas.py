from typing import  Literal
# schemas/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any


# User Schemas
class CreateUserRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone:str
    password: str

class UserResponse(BaseModel):
    id: int
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    userType: Optional[str] = None
    phone:Optional[str] = None
    is_active: Optional[bool] = None


    class Config:
        from_attributes = True

class UpdateUserRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    userType: Optional[str] = None
    phone:Optional[str] = None
    password: Optional[str] = None


class UpdateUserTypeRequest(BaseModel):
    userType: str


# Existing schemas (keep these)
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    UserInfo: UserResponse

class FormData(BaseModel):
    email: str
    password: str
    
    
class UpdatePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

class UpdatePhoneRequest(BaseModel):
    phone: str
    


class EmailSchema(BaseModel):
    purpose: Literal["login", "email","reset","Info"]
    toEmail: EmailStr

class OtpVerify(BaseModel):
    otp_code: str
    verification_code: str
    email: EmailStr