from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List
from services.recipe_generator import generate_recipe_from_prompt
# from database import get_session
# from sqlmodel import Session
import logging
import schemas

router = APIRouter()
logger = logging.getLogger("my_app")


class RecipeData(BaseModel):
    dish_name: str | None = None
    cuisine: str | None = None
    dish_description: str | None = None
    ingredients: List[str] | None = None
    cooking_steps: List[dict] | None = None


class RecipeResponse(BaseModel):
    status: str
    message: str
    data: RecipeData | None = None


@router.post("/generate-recipe", response_model=RecipeResponse)
async def generate_recipe_endpoint(recipe: schemas.RecipeRequest):
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
        res = await generate_recipe_from_prompt(recipe)
    except Exception as e:
        logger.error(f"Error in generating recipe: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating recipe: {str(e)}")

    return {
        "status": "success",
        "message": "Recipe generated successfully",
        "data": res,
    }
