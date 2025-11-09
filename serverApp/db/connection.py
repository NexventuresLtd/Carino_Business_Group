from fastapi import Depends
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from typing import Annotated
from models.userModels import  Base as UserBase
from models.EventsModel import  Base as EventsBase
from models.expense import  Base as ExpenseBase
from models.IncomeModel import  Base as IncomeBase
from models.planning import Base as PlanningBase
from models.investorModels import Base as InvBaSe
from models.account import Base as AccBase

AccBase.metadata.create_all(bind=engine)
InvBaSe.metadata.create_all(bind=engine)
UserBase.metadata.create_all(bind=engine)
EventsBase.metadata.create_all(bind=engine)
ExpenseBase.metadata.create_all(bind=engine)
IncomeBase.metadata.create_all(bind=engine)
PlanningBase.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]