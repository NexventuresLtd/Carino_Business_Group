from sqlalchemy import Column, Integer, String,Text,DateTime, Boolean
from db.database import Base
from datetime import date
from datetime import datetime

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    last_name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    email = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    userType = Column(String(255),  nullable=True, default="admin")  # Non-nullable for uniqueness
    phone = Column(String(255),  nullable=True, default="0987654321")  # Non-nullable for uniqueness
    password = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    is_active = Column(Boolean,  nullable=True, default=True)  # Non-nullable for uniqueness

 
    
class OTP(Base):
    __tablename__ = "sent_otps"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, index=True)
    otp_code = Column(String, index=True)
    verification_code = Column(String, index=True)
    purpose = Column(String, index=True)
    date = Column(DateTime, default=datetime.utcnow, index=True)