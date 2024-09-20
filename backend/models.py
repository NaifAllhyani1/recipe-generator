from sqlmodel import Field, SQLModel, create_engine
from typing import List, Optional

class Recipe(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    ingredients: List[str] | None = None
    cuisine: str | None = None
    allergies: Optional[List[str]] = None
    description: str
    image: str
