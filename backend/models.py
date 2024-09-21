from sqlmodel import Field, SQLModel
from typing import List
from sqlalchemy import JSON, Column


class Recipe(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    dish_name: str
    ingredients: List[str] = Field(sa_column=Column(JSON))
    cuisine: str | None = None
    allergies: List[str] | None = Field(default=None, sa_column=Column(JSON))
    dish_description: str
    cooking_steps: List[str] = Field(sa_column=Column(JSON))
    image_url: str | None = None
