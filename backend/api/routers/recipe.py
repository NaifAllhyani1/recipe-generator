from fastapi import APIRouter, HTTPException, status, Depends
import schemas
from pydantic import BaseModel
from typing import List, Optional
from services.recipe_generator import generate_recipe_from_prompt
from database import get_session
from sqlmodel import Session
import logging

router = APIRouter()
logger = logging.getLogger("my_app")

class RecipeData(BaseModel):
    id: int
    dish_name: str
    ingredients: List[str]
    cuisine: Optional[str] = None
    allergies: Optional[List[str]] = None
    dish_description: str
    cooking_steps: List[str]
    image_url: Optional[str] = None

class RecipeResponse(BaseModel):
    status: str
    message: str
    data: Optional[RecipeData] = None

@router.post("/generate-recipe", response_model=RecipeResponse)
async def generate_recipe_endpoint(recipe: schemas.RecipeRequest, db: Session = Depends(get_session)):
    if recipe.has_all_ingredients and not recipe.cuisine:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cuisine is required if all ingredients are selected",
        )

    if not recipe.ingredients and not recipe.has_all_ingredients:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one ingredient is required",
        )

    try:
        db_recipe = await generate_recipe_from_prompt(recipe, db)
    except Exception as e:
        logger.error(f"Error in generating recipe: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating recipe")

    return {
        "status": "success",
        "message": "Recipe generated successfully",
        "data": RecipeData(
            id=db_recipe.id,
            dish_name=db_recipe.dish_name,
            ingredients=db_recipe.ingredients,
            cuisine=db_recipe.cuisine,
            allergies=db_recipe.allergies,
            dish_description=db_recipe.dish_description,
            cooking_steps=db_recipe.cooking_steps,
            image_url=db_recipe.image_url
        ),
    }
