from fastapi import APIRouter, Depends, HTTPException, status
import schemas
import logging
from pydantic import BaseModel

router = APIRouter()


logger = logging.getLogger("my_app")


class RecipeResponse(BaseModel):
    status: str
    message: str
    data: schemas.RecipeRequest


@router.post("/generate-recipe", response_model=RecipeResponse)
async def generate_recipe(recipe: schemas.RecipeRequest):
    try:
        return {
            "status": "success",
            "message": "Recipe generated successfully",
            "data": recipe,
        }
    except Exception as e:
        logger.error(f"Error generating recipe: {e}")
        return {
            "status": "error",
            "message": "An error occurred while generating the recipe.",
        }, 500
