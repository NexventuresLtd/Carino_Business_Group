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
    event_count:Optional[int] = None

    class Config:
        from_attributes = True

class UpdateUserRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    userType: Optional[str] = None
    phone:Optional[str] = None
    password: Optional[str] = None

class CreateTeamLeadRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone:Optional[str] = None
    password: str

class UpdateUserTypeRequest(BaseModel):
    userType: str

# Customer Schemas
class CreateCustomerRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    company: Optional[str] = None
    notes: Optional[str] = None

class CustomerResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    city: Optional[str]
    country: Optional[str]
    company: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    creator_first_name:Optional[str]
    creator_last_name:Optional[str]
    

    class Config:
        from_attributes = True

class UpdateCustomerRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    company: Optional[str] = None
    notes: Optional[str] = None

# Existing schemas (keep these)
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    UserInfo: UserResponse

class FormData(BaseModel):
    email: str
    password: str
    
    


# Event Schemas
class EventBase(BaseModel):
    name: str
    date: datetime
    agreed_amount: Optional[float] = 0.0
    expected_expenses: Optional[float] = 0.0
    actual_expenses: Optional[float] = 0.0
    status: Optional[str] = "planned"
    customer_id: Optional[int] = None
    team_id: Optional[int] = None
    type: Optional[int] = None
    venue: Optional[int] = None
    description: Optional[str] = None


class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    name: Optional[str] = None
    date: Optional[datetime] = None
    agreed_amount: Optional[float] = None
    expected_expenses: Optional[float] = None
    actual_expenses: Optional[float] = None
    status: Optional[str] = None
    customer_id: Optional[int] = None
    team_id: Optional[int] = None
    type: Optional[int] = None
    venue: Optional[int] = None
    description: Optional[str] = None

class EventResponse(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Event with related data (for detailed responses)
class EventDetailedResponse(EventResponse):
    customer_name: Optional[str] = None
    venue_name: Optional[str] = None
    event_type_name: Optional[str] = None
    team_name: Optional[str] = None

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