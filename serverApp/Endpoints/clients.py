from fastapi import APIRouter, HTTPException
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from db.connection import db_dependency
from models.userModels import Users as User
from models.serviceModel import Clients
from schemas.client_schemas import (
    ClientResponse,
    CreateClientRequest,
    UpdateClientRequest
)
from db.VerifyToken import user_dependency

router = APIRouter(prefix="/clients", tags=["Clients"])

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

# Get all clients - accessible to all authenticated users
@router.get("/", response_model=List[ClientResponse])
async def get_all_clients(
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100,
    client_type: Optional[str] = None
):
    user = check_user_authentication(user)
    
    # Build query
    query = db.query(Clients)
    
    # Filter by client type if provided
    if client_type:
        query = query.filter(Clients.client_type == client_type)
    
    # Get clients
    clients = query.offset(skip).limit(limit).all()
    
    # Convert to response format with creator information
    client_responses = []
    for client in clients:
        creator_first_name, creator_last_name = get_creator_info(db, client.user_id)
        
        client_data = {
            "id": client.id,
            "name": client.name or "",
            "client_type": client.client_type or "",
            "phone": client.phone or "",
            "email": client.email,
            "num_projects": client.num_projects or "",
            "user_id": client.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        client_responses.append(ClientResponse(**client_data))
    
    return client_responses

# Get client by ID - accessible to all authenticated users
@router.get("/{client_id}", response_model=ClientResponse)
async def get_client(
    client_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_user_authentication(user)
    
    client = db.query(Clients).filter(Clients.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    creator_first_name, creator_last_name = get_creator_info(db, client.user_id)
    
    client_data = {
        "id": client.id,
        "name": client.name or "",
        "client_type": client.client_type or "",
        "phone": client.phone or "",
        "email": client.email,
        "num_projects": client.num_projects or "",
        "user_id": client.user_id,
        "creator_first_name": creator_first_name,
        "creator_last_name": creator_last_name
    }
    
    return ClientResponse(**client_data)

# Create client - only for admin
@router.post("/", response_model=ClientResponse)
async def create_client(
    client_data: CreateClientRequest,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    # Check if email already exists
    existing_client = db.query(Clients).filter(Clients.email == client_data.email).first()
    if existing_client:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Verify user exists
    creator_user = db.query(User).filter(User.id == user["user_id"]).first()
    if not creator_user:
        raise HTTPException(status_code=400, detail="User not found")
    
    client = Clients(
        name=client_data.name,
        client_type=client_data.client_type,
        phone=client_data.phone,
        email=client_data.email,
        num_projects=client_data.num_projects,
        user_id=user["user_id"]
    )
    
    db.add(client)
    db.commit()
    db.refresh(client)
    
    client_response_data = {
        "id": client.id,
        "name": client.name or "",
        "client_type": client.client_type or "",
        "phone": client.phone or "",
        "email": client.email,
        "num_projects": client.num_projects or "",
        "user_id": client.user_id,
        "creator_first_name": creator_user.first_name,
        "creator_last_name": creator_user.last_name
    }
    
    return ClientResponse(**client_response_data)

# Update client - only for admin
@router.put("/{client_id}", response_model=ClientResponse)
async def update_client(
    client_id: int,
    client_update: UpdateClientRequest,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    client = db.query(Clients).filter(Clients.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Check if email is being updated and if it already exists
    if client_update.email and client_update.email != client.email:
        existing_client = db.query(Clients).filter(
            Clients.email == client_update.email,
            Clients.id != client_id
        ).first()
        if existing_client:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    creator_first_name, creator_last_name = get_creator_info(db, client.user_id)
    
    # Update fields if provided
    update_data = client_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(client, field, value)
    
    db.commit()
    db.refresh(client)
    
    client_response_data = {
        "id": client.id,
        "name": client.name or "",
        "client_type": client.client_type or "",
        "phone": client.phone or "",
        "email": client.email,
        "num_projects": client.num_projects or "",
        "user_id": client.user_id,
        "creator_first_name": creator_first_name,
        "creator_last_name": creator_last_name
    }
    
    return ClientResponse(**client_response_data)

# Delete client - only for admin
@router.delete("/{client_id}")
async def delete_client(
    client_id: int,
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    client = db.query(Clients).filter(Clients.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    db.delete(client)
    db.commit()
    return {"message": "Client deleted successfully"}

# Search clients - accessible to all authenticated users
@router.get("/search/", response_model=List[ClientResponse])
async def search_clients(
    query: str,
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    clients = db.query(Clients).filter(
        or_(
            Clients.name.ilike(f"%{query}%"),
            Clients.email.ilike(f"%{query}%"),
            Clients.client_type.ilike(f"%{query}%"),
            Clients.phone.ilike(f"%{query}%"),
            Clients.num_projects.ilike(f"%{query}%")
        )
    ).offset(skip).limit(limit).all()
    
    client_responses = []
    for client in clients:
        creator_first_name, creator_last_name = get_creator_info(db, client.user_id)
        
        client_data = {
            "id": client.id,
            "name": client.name or "",
            "client_type": client.client_type or "",
            "phone": client.phone or "",
            "email": client.email,
            "num_projects": client.num_projects or "",
            "user_id": client.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        client_responses.append(ClientResponse(**client_data))
    
    return client_responses

# Get clients created by current user
@router.get("/my-clients/", response_model=List[ClientResponse])
async def get_my_clients(
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    clients = db.query(Clients).filter(
        Clients.user_id == user["user_id"]
    ).offset(skip).limit(limit).all()
    
    client_responses = []
    for client in clients:
        creator_first_name, creator_last_name = get_creator_info(db, client.user_id)
        
        client_data = {
            "id": client.id,
            "name": client.name or "",
            "client_type": client.client_type or "",
            "phone": client.phone or "",
            "email": client.email,
            "num_projects": client.num_projects or "",
            "user_id": client.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        client_responses.append(ClientResponse(**client_data))
    
    return client_responses

# Get client statistics - only for admin
@router.get("/stats/summary")
async def get_client_stats(
    db: db_dependency,
    user: user_dependency
):
    user = check_admin_access(user)
    
    total_clients = db.query(Clients).count()
    
    # Count by client type
    client_type_stats = []
    distinct_types = db.query(Clients.client_type).distinct().all()
    
    for client_type_tuple in distinct_types:
        client_type = client_type_tuple[0]
        if client_type:
            count = db.query(Clients).filter(Clients.client_type == client_type).count()
            client_type_stats.append({
                "client_type": client_type,
                "count": count
            })
    
    # Get clients created by each user with their names
    user_stats = []
    all_users = db.query(User).all()
    
    for user_obj in all_users:
        client_count = db.query(Clients).filter(Clients.user_id == user_obj.id).count()
        if client_count > 0:
            user_stats.append({
                "user_id": user_obj.id,
                "user_name": f"{user_obj.first_name} {user_obj.last_name}",
                "client_count": client_count
            })
    
    stats = {
        "total_clients": total_clients,
        "client_type_breakdown": client_type_stats,
        "user_breakdown": user_stats
    }
    
    return stats

# Get clients by type - accessible to all authenticated users
@router.get("/type/{client_type}", response_model=List[ClientResponse])
async def get_clients_by_type(
    client_type: str,
    db: db_dependency,
    user: user_dependency,
    skip: int = 0,
    limit: int = 100
):
    user = check_user_authentication(user)
    
    clients = db.query(Clients).filter(
        Clients.client_type == client_type
    ).offset(skip).limit(limit).all()
    
    client_responses = []
    for client in clients:
        creator_first_name, creator_last_name = get_creator_info(db, client.user_id)
        
        client_data = {
            "id": client.id,
            "name": client.name or "",
            "client_type": client.client_type or "",
            "phone": client.phone or "",
            "email": client.email,
            "num_projects": client.num_projects or "",
            "user_id": client.user_id,
            "creator_first_name": creator_first_name,
            "creator_last_name": creator_last_name
        }
        client_responses.append(ClientResponse(**client_data))
    
    return client_responses