from datetime import timedelta, datetime
from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from typing import Annotated
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from db.connection import db_dependency
from models.userModels import Users
from sqlalchemy.orm import Session
from sqlalchemy import or_

from schemas.schemas import CreateUserRequest, Token, FormData,UpdatePasswordRequest ,UpdatePhoneRequest

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Load environment values
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# Setup password encryption and token generation
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


# Handle register User
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(db: db_dependency, create_user_request: CreateUserRequest):
    try:
        check_user = db.query(Users).filter(Users.email == create_user_request.email).first()
        if check_user:
            raise HTTPException(status_code=400, detail="Email is already taken")

        # Create the user model
        create_user_model = Users(
            first_name=create_user_request.first_name,
            last_name=create_user_request.last_name,
            email=create_user_request.email,
            userType="admin",
            password=bcrypt_context.hash(create_user_request.password),
        )

        # Add to the database and commit
        db.add(create_user_model)
        db.commit()
        db.refresh(create_user_model)

        return {
            "id": create_user_model.id,
            "first_name": create_user_model.first_name,
            "last_name": create_user_model.last_name,
            "email": create_user_model.email,
            "userType": create_user_model.userType,
        }

    except Exception as e:
        print(f"Error occurred: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")


# Login user and create token
@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: FormData, db: db_dependency):
    user = authenticate_user(form_data.email, form_data.password, db)
    if not user:
        print("Authentication failed for user:", form_data.email)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No account found with the given credentials",
        )

    access_token_expires = timedelta(days=30)      # Short-lived
    refresh_token_expires = timedelta(days=60)         # Longer-lived

    access_token = create_token(
        {"email": user.email, "id": user.id,"userType":user.userType},
        access_token_expires,
        token_type="access"
    )
    refresh_token = create_token(
        {"email": user.email, "id": user.id,"userType": user.userType},
        refresh_token_expires,
        token_type="refresh"
    )

    return {
        "UserInfo": user,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


def authenticate_user(email: str, password: str, db: Session):
    user = db.query(Users).filter(Users.email == email).first()
    if not user or not bcrypt_context.verify(password, user.password):
        return False
    return user


def create_token(data: dict, expires_delta: timedelta, token_type: str):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire, "type": token_type})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        user_id: str = payload.get("id")
        userType: str = payload.get("userType")
        if email is None or user_id is None :
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required!",
            )
        return {"email": email, "user_id": user_id, "userType":userType}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed. Your token is invalid or has expired. Please re-authenticate.",
        )

@router.post("/refresh")
async def refresh_access_token(request: dict):
    try:
        refresh_token = request.get("refresh_token")
        if not refresh_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Refresh token is required"
            )
            
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type. Only refresh tokens are allowed."
            )
            
        email: str = payload.get("email")
        user_id: int = payload.get("id")
        userType: str = payload.get("userType")

        # Create new access token (30 days might be too long - consider shorter duration)
        new_access_token = create_token(
            {"email": email, "id": user_id, "userType": userType},
            expires_delta=timedelta(days=30),  # Shorter for better security
            token_type="access"
        )

        return {"access_token": new_access_token, "token_type": "bearer"}

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token."
        )

# Password update endpoint
@router.put("/update-password", status_code=status.HTTP_200_OK)
async def update_password(
    db: db_dependency,
    password_data: UpdatePasswordRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        # Get user from database
        user = db.query(Users).filter(Users.id == current_user["user_id"]).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Verify current password
        if not bcrypt_context.verify(password_data.current_password, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect"
            )

        # Check if new password and confirm password match
        if password_data.new_password != password_data.confirm_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password and confirm password do not match"
            )

        # Check if new password is different from current password
        if bcrypt_context.verify(password_data.new_password, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password cannot be the same as current password"
            )

        # Update password
        user.password = bcrypt_context.hash(password_data.new_password)
        db.commit()
        
        return {
            "message": "Password updated successfully",
            "status": "success"
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating password: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update password"
        )

# Phone number update endpoint
@router.put("/update-phone", status_code=status.HTTP_200_OK)
async def update_phone(
    db: db_dependency,
    phone_data: UpdatePhoneRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        # Validate phone number
        if not phone_data.phone.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number cannot be empty"
            )

        # Check if phone number is already taken by another user
        existing_user = db.query(Users).filter(
            Users.phone == phone_data.phone,
            Users.id != current_user["user_id"]
        ).first()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number is already registered with another account"
            )

        # Get user and update phone number
        user = db.query(Users).filter(Users.id == current_user["user_id"]).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Update phone number
        user.phone = phone_data.phone
        db.commit()
        
        return {
            "message": "Phone number updated successfully",
            "status": "success",
            "phone": user.phone
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating phone number: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update phone number"
        )

# Get user profile endpoint
@router.get("/profile", status_code=status.HTTP_200_OK)
async def get_user_profile(
    db: db_dependency,
    current_user: dict = Depends(get_current_user)
):
    try:
        user = db.query(Users).filter(Users.id == current_user["user_id"]).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "userType": user.userType
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching user profile: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user profile"
        )