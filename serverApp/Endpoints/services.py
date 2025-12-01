from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from db.connection import db_dependency
from models.userModels import  Users as User
from models.serviceModel import Services
from schemas.services_schemas import (
    ServiceResponse,
    CreateServiceRequest,
    UpdateServiceRequest
)
from db.VerifyToken import user_dependency
from datetime import datetime

router = APIRouter(prefix="/services", tags=["Services"])

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

# Get all services - accessible to all authenticated users
@router.get("/", response_model=List[ServiceResponse])
async def get_all_services(
    db: db_dependency,
    # user: user_dependency,
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None
):
    # user = check_user_authentication(user)
    
    # Build query
    query = db.query(Services)
    
    # Filter by status if provided
    if status:
        query = query.filter(Services.status == status)
    
    # Get services
    services = query.offset(skip).limit(limit).all()
    
    # Convert to response format with creator information
    service_responses = []
    for service in services:
        creator_first_name, creator_last_name = get_creator_info(db, service.user_id)
        
        service_data = {
            "id": service.id,
            "title": service.title,
            "description": service.description or "",
            "price": service.price,
            "features": service.features or "",
            "status": service.status,
            "created_at": service.created_at.isoformat() if service.created_at else "",
            "updated_at": service.updated_at.isoformat() if service.updated_at else "",
            "user_id": service.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        service_responses.append(ServiceResponse(**service_data))
    
    return service_responses

# Get service by ID - accessible to all authenticated users
@router.get("/{service_id}", response_model=ServiceResponse)
async def get_service(
    service_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_user_authentication(user)
    
    service = db.query(Services).filter(Services.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    creator_first_name, creator_last_name = get_creator_info(db, service.user_id)
    
    service_data = {
        "id": service.id,
        "title": service.title,
        "description": service.description or "",
        "price": service.price,
        "features": service.features or "",
        "status": service.status,
        "created_at": service.created_at.isoformat() if service.created_at else "",
        "updated_at": service.updated_at.isoformat() if service.updated_at else "",
        "user_id": service.user_id,
        "creator_first_name": creator_first_name,
        "creator_last_name": creator_last_name
    }
    
    return ServiceResponse(**service_data)

# Create service - only for admin
@router.post("/", response_model=ServiceResponse)
async def create_service(
    service_data: CreateServiceRequest,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    # Verify user exists
    creator_user = db.query(User).filter(User.id == user["user_id"]).first()
    if not creator_user:
        raise HTTPException(status_code=400, detail="User not found")
    
    service = Services(
        title=service_data.title,
        description=service_data.description,
        price=service_data.price,
        features=service_data.features,
        status=service_data.status or "active",
        user_id=user["user_id"]
    )
    
    db.add(service)
    db.commit()
    db.refresh(service)
    
    service_response_data = {
        "id": service.id,
        "title": service.title,
        "description": service.description or "",
        "price": service.price,
        "features": service.features or "",
        "status": service.status,
        "created_at": service.created_at.isoformat() if service.created_at else "",
        "updated_at": service.updated_at.isoformat() if service.updated_at else "",
        "user_id": service.user_id,
        "creator_first_name": creator_user.first_name,
        "creator_last_name": creator_user.last_name
    }
    
    return ServiceResponse(**service_response_data)

# Update service - only for admin
@router.put("/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: int,
    service_update: UpdateServiceRequest,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    service = db.query(Services).filter(Services.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    creator_first_name, creator_last_name = get_creator_info(db, service.user_id)
    
    # Update fields if provided
    update_data = service_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(service, field, value)
    
    service.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(service)
    
    service_response_data = {
        "id": service.id,
        "title": service.title,
        "description": service.description or "",
        "price": service.price,
        "features": service.features or "",
        "status": service.status,
        "created_at": service.created_at.isoformat() if service.created_at else "",
        "updated_at": service.updated_at.isoformat() if service.updated_at else "",
        "user_id": service.user_id,
        "creator_first_name": creator_first_name,
        "creator_last_name": creator_last_name
    }
    
    return ServiceResponse(**service_response_data)

# Delete service - only for admin
@router.delete("/{service_id}")
async def delete_service(
    service_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    service = db.query(Services).filter(Services.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(service)
    db.commit()
    return {"message": "Service deleted successfully"}

# Search services - accessible to all authenticated users
@router.get("/search/", response_model=List[ServiceResponse])
async def search_services(
    query: str,
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    services = db.query(Services).filter(
        or_(
            Services.title.ilike(f"%{query}%"),
            Services.description.ilike(f"%{query}%"),
            Services.features.ilike(f"%{query}%")
        )
    ).offset(skip).limit(limit).all()
    
    service_responses = []
    for service in services:
        creator_first_name, creator_last_name = get_creator_info(db, service.user_id)
        
        service_data = {
            "id": service.id,
            "title": service.title,
            "description": service.description or "",
            "price": service.price,
            "features": service.features or "",
            "status": service.status,
            "created_at": service.created_at.isoformat() if service.created_at else "",
            "updated_at": service.updated_at.isoformat() if service.updated_at else "",
            "user_id": service.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        service_responses.append(ServiceResponse(**service_data))
    
    return service_responses

# Get services created by current user
@router.get("/my-services/", response_model=List[ServiceResponse])
async def get_my_services(
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    services = db.query(Services).filter(
        Services.user_id == user["user_id"]
    ).offset(skip).limit(limit).all()
    
    service_responses = []
    for service in services:
        creator_first_name, creator_last_name = get_creator_info(db, service.user_id)
        
        service_data = {
            "id": service.id,
            "title": service.title,
            "description": service.description or "",
            "price": service.price,
            "features": service.features or "",
            "status": service.status,
            "created_at": service.created_at.isoformat() if service.created_at else "",
            "updated_at": service.updated_at.isoformat() if service.updated_at else "",
            "user_id": service.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        service_responses.append(ServiceResponse(**service_data))
    
    return service_responses