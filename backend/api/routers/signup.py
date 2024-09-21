from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from database import get_session
from sqlmodel import Session, select
import schemas
from models import User

router = APIRouter()


@router.get("/signup")
async def signup(user: schemas.UserRequest, db: Session = Depends(get_session)):
    if db.exec(select(User).where(User.email == user.email)).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    if db.exec(select(User).where(User.username == user.username)).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    # TODO hash password
    # TODO generate token
    

