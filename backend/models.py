from sqlmodel import Field, SQLModel
from typing import List, Optional


class Recipe(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    dish_name: str
    ingredients: List[str]
    cuisine: Optional[str] = None
    allergies: Optional[List[str]] = None
    dish_description: str
    cooking_steps: List[str]
    image_url: Optional[str] = None
