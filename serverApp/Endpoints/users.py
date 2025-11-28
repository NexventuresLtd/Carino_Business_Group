# Endpoints/users.py
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from sqlalchemy.orm import Session
from db.connection import db_dependency
from models.userModels import Users
from schemas.schemas import (
    UserResponse, 
    UpdateUserRequest, 
    UpdateUserTypeRequest
)

from db.VerifyToken import user_dependency
from passlib.context import CryptContext
from sqlalchemy import func, or_

router = APIRouter(prefix="/users", tags=["Users"])
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Get all users
@router.get("/", response_model=List[UserResponse])
async def get_all_users(
    db: db_dependency,
    # current_user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    results = db.query(Users).offset(skip).limit(limit).all()

   
    users ={
        "total": len(results),
        "users": results
        }

    return users


# Get user by ID
@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: db_dependency,
    # current_user: user_dependency
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
    # current_user: user_dependency
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
    # current_user: user_dependency
):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}


# Update user type
@router.patch("/{user_id}/user-type", response_model=UserResponse)
async def update_user_type(
    user_id: int,
    user_type_data: UpdateUserTypeRequest,
    db: db_dependency,
    # current_user: user_dependency
):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate user type
    valid_user_types = ["admin",]
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
        db.query(Users)
        .filter(Users.userType == user_type)
        .offset(skip)
        .limit(limit)
        .all()
    )
    users = {
        "total": len(results),
        "users": results
    }
   

    return users