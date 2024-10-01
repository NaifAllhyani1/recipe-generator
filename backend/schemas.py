from pydantic import BaseModel
from typing import List


class RecipeRequest(BaseModel):
    ingredients: List[str] | None = None
    cuisine: str | None = None
    allergies: List[str] | None = None
    has_all_ingredients: bool
    user_id: str


