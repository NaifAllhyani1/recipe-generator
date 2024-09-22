from sqlmodel import Field, SQLModel
from sqlalchemy import JSON, Column 
from typing import List
from datetime import datetime

class Recipe(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    dish_name: str
    cuisine: str | None = None
    dish_description: str
    ingredients: List[str] = Field(sa_column=Column(JSON))
    cooking_steps: List[str] = Field(sa_column=Column(JSON))
    image_url: str | None = None
    user_id: str


