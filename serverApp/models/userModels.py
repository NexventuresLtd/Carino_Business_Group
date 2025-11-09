from sqlalchemy import Column, Integer, String,Text,DateTime
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

class Customers(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    last_name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    email = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    phone = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    city = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    country = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    company = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    notes = Column(Text,  nullable=True, default="")  # Non-nullable for uniqueness
    user_id = Column(Integer, nullable=True,default=15)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class EventsCategory(Base):
    __tablename__ = "eventscategory"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    description = Column(Text,  nullable=True, default="")  # Non-nullable for uniqueness
    user_id = Column(Integer, nullable=True,default=15)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
class EventsVenue(Base):
    __tablename__ = "eventsvenue"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    location = Column(String(255),  nullable=True, default="")  # Non-nullable for uniqueness
    # capacity = Column(Integer,  nullable=True, default=0)  # Non-nullable for uniqueness
    user_id = Column(Integer, nullable=True,default=15)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    
class OTP(Base):
    __tablename__ = "sent_otps"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, index=True)
    otp_code = Column(String, index=True)
    verification_code = Column(String, index=True)
    purpose = Column(String, index=True)
    date = Column(DateTime, default=datetime.utcnow, index=True)