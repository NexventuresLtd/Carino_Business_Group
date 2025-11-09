# Endpoints/users.py
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from sqlalchemy.orm import Session
from db.connection import db_dependency
from models.userModels import Users
from schemas.schemas import (
    UserResponse, 
    UpdateUserRequest, 
    CreateTeamLeadRequest,
    UpdateUserTypeRequest
)
from models.EventsModel import Event
from db.VerifyToken import get_current_user
from passlib.context import CryptContext
from sqlalchemy import func, or_

router = APIRouter(prefix="/users", tags=["Users"])
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Get all users
@router.get("/", response_model=List[UserResponse])
async def get_all_users(
    db: db_dependency,
    # current_user: get_current_user,
    skip: int = 0,
    limit: int = 100
):
    results = (
        db.query(Users, func.count(Event.id).label("event_count"))
        .outerjoin(Event, or_(Users.id == Event.team_id, Users.id == Event.sales_id))
        .group_by(Users.id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    users = []
    for user, count in results:
        users.append({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "userType": user.userType,
            "phone": user.phone,
            "event_count": count  
        })

    return users


# Get user by ID
@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: db_dependency,
    # current_user: get_current_user
):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_update: UpdateUserRequest,
    db: db_dependency,
    # current_user: get_current_user
):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.model_dump(exclude_unset=True)

    # ✅ Secure password update
    if "password" in update_data:
        raw_password = update_data["password"]
        if raw_password:  # only hash if a new password is provided
            update_data["password"] = bcrypt_context.hash(raw_password)
        else:
            update_data.pop("password")  # prevent setting empty password

    #  Apply other fields
    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user

# Delete user
@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: db_dependency,
    # current_user: get_current_user
):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

# Add team lead (non-admin user)
@router.post("/team-lead", response_model=UserResponse)
async def create_team_lead(
    team_lead_data: CreateTeamLeadRequest,
    db: db_dependency,
    # current_user: get_current_user
):
    # Check if email already exists
    existing_user = db.query(Users).filter(Users.email == team_lead_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if phone already exists
    existing_user = db.query(Users).filter(Users.phone == team_lead_data.phone).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="phone already registered")
    
    # Create team lead with userType = "team_lead"
    team_lead = Users(
        first_name=team_lead_data.first_name,
        last_name=team_lead_data.last_name,
        email=team_lead_data.email,
        phone=team_lead_data.phone,
        userType="team_lead",
        password=bcrypt_context.hash(team_lead_data.password)
    )
    
    db.add(team_lead)
    db.commit()
    db.refresh(team_lead)
    
    return team_lead
@router.post("/sales-lead", response_model=UserResponse)
async def create_team_lead(
    team_lead_data: CreateTeamLeadRequest,
    db: db_dependency,
    # current_user: get_current_user
):
    # Check if email already exists
    existing_user = db.query(Users).filter(Users.email == team_lead_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create team lead with userType = "team_lead"
    team_lead = Users(
        first_name=team_lead_data.first_name,
        last_name=team_lead_data.last_name,
        email=team_lead_data.email,
        userType="sales",
        phone=team_lead_data.phone,
        password=bcrypt_context.hash(team_lead_data.password)
    )
    
    db.add(team_lead)
    db.commit()
    db.refresh(team_lead)
    
    return team_lead
@router.post("/super_sales", response_model=UserResponse)
async def create_super_sales(
    super_sales_data: CreateTeamLeadRequest,
    db: db_dependency,
    # current_user: get_current_user
):
    # Check if email already exists
    existing_user = db.query(Users).filter(Users.email == super_sales_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create team lead with userType = "team_lead"
    team_lead = Users(
        first_name=super_sales_data.first_name,
        last_name=super_sales_data.last_name,
        email=super_sales_data.email,
        userType="super_sales",
        phone=super_sales_data.phone,
        password=bcrypt_context.hash(super_sales_data.password)
    )
    
    db.add(team_lead)
    db.commit()
    db.refresh(team_lead)
    
    return team_lead

@router.post("/admin-lead", response_model=UserResponse)
async def create_team_lead(
    team_lead_data: CreateTeamLeadRequest,
    db: db_dependency,
    # current_user: get_current_user
):
    # Check if email already exists
    existing_user = db.query(Users).filter(Users.email == team_lead_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create team lead with userType = "team_lead"
    team_lead = Users(
        first_name=team_lead_data.first_name,
        last_name=team_lead_data.last_name,
        email=team_lead_data.email,
        phone=team_lead_data.phone,
        userType="desange",
        password=bcrypt_context.hash(team_lead_data.password)
    )
    
    db.add(team_lead)
    db.commit()
    db.refresh(team_lead)
    
    return team_lead

# Update user type
@router.patch("/{user_id}/user-type", response_model=UserResponse)
async def update_user_type(
    user_id: int,
    user_type_data: UpdateUserTypeRequest,
    db: db_dependency,
    # current_user: get_current_user
):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate user type
    valid_user_types = ["sales", "team_lead", "desange"]
    if user_type_data.userType not in valid_user_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid user type. Must be one of: {valid_user_types}"
        )
    
    user.userType = user_type_data.userType
    db.commit()
    db.refresh(user)
    
    return user

# Get users by type
@router.get("/type/{user_type}", response_model=List[UserResponse])
async def get_users_by_type(
    db: db_dependency,
    user_type: str,
    skip: int = 0,
    limit: int = 100,
):
    results = (
        db.query(Users, func.count(Event.id).label("event_count"))
        .outerjoin(Event, or_(Users.id == Event.team_id,Users.id == Event.sales_id))
        .filter(Users.userType == user_type)
        .group_by(Users.id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    users = []
    for user, count in results:
        users.append({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "userType": user.userType,
            "phone": user.phone,
            "event_count": count,
        })

    return users