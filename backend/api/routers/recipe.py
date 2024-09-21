from fastapi import APIRouter, Depends, HTTPException, status
import schemas
import logging
from pydantic import BaseModel
from utils.prompt import (
    generate_recipe_by_ingredients_prompt,
    generate_recipe_by_cuisine_prompt,
)

router = APIRouter()


logger = logging.getLogger("my_app")


class RecipeResponse(BaseModel):
    status: str
    message: str
    data: schemas.RecipeRequest | None = None   


@router.post("/generate-recipe", response_model=RecipeResponse)
async def generate_recipe(recipe: schemas.RecipeRequest):
   
    if recipe.has_all_ingredients:
        if not recipe.cuisine:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cuisine is required if all ingredients are selected",
            )
        response = await generate_recipe_by_cuisine(recipe)
    else:
        if not recipe.ingredients:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="At least one ingredient is required",
            )
        response = await generate_recipe_by_ingredients(recipe)

        return {"status": "success", "message": "Recipe generated successfully", "data": response}


async def generate_recipe_by_cuisine(recipe: schemas.RecipeRequest) -> dict:
    prompt = generate_recipe_by_cuisine_prompt(recipe.cuisine, recipe.allergies)
    
    # TODO: send request to generate recipe based on cuisine
    pass


async def generate_recipe_by_ingredients(recipe: schemas.RecipeRequest) -> dict:
    prompt = generate_recipe_by_ingredients_prompt(recipe.ingredients, recipe.allergies)
    # TODO: send request to generate recipe based on ingredients
    pass
