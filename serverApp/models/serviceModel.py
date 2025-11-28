from sqlalchemy import Column, Integer, String,Text,DateTime
from db.database import Base
from datetime import date
from datetime import datetime

class Services(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255),  nullable=False)  
    description = Column(Text,  nullable=True)  
    price = Column(Integer,  nullable=False, default=0)  
    features = Column(Text,  nullable=True)
    status = Column(String(250),  nullable=False, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)  
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer ,nullable=True)
    
class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(Text, nullable=True)
    title = Column(String(255), nullable=False)
    subtitle = Column(Text,  nullable=True)  
    mainText = Column(Text ,nullable=True)
    user_id = Column(Integer ,nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)  
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Clients(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=True)
    client_type = Column(String(255) ,nullable=True)
    phone = Column(String(255),  nullable=True)  
    email = Column(String(255), nullable=False)
    num_projects = Column(String(255) ,nullable=True)
    user_id = Column(Integer ,nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)  
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
