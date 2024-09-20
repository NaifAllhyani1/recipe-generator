from pydantic import BaseModel
from typing import List, Optional

class RecipeRequest(BaseModel):
    ingredients: List[str] | None = None
    cuisine: Optional[str] = None
    allergies: Optional[List[str]] = None
    has_all_ingredients: bool
