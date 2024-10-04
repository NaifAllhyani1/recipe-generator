from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List
from services.recipe_generator import generate_recipe_from_prompt
from database import get_session
from sqlmodel import Session, select
import logging
import schemas
from models import Recipe

router = APIRouter()
logger = logging.getLogger("my_app")


class RecipeData(BaseModel):
    dish_name: str | None = None
    cuisine: str | None = None
    dish_description: str | None = None
    ingredients: List[str] | None = None
    cooking_steps: List[dict] | None = None
    image_url: str | None = None
    user_id: str


class RecipeResponse(BaseModel):
    status: str
    message: str
    data: RecipeData | None = None


class UserRecipesRequest(BaseModel):
    user_id: str


class RecipeByUserResponse(BaseModel):
    status: str
    message: str
    data: List[Recipe]


@router.post("/generate-recipe", response_model=RecipeResponse)
async def generate_recipe_endpoint(
    recipe: schemas.RecipeRequest, db: Session = Depends(get_session)
):
    if not recipe.user_id or len(recipe.user_id) < 5:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"status": "error", "message": "Invalid user_id"},
        )

    res = await generate_recipe_from_prompt(recipe, db)
    insert_recipe_to_db(res, db)
    return {
        "status": "success",
        "message": "Recipe generated successfully",
        "data": res,
    }


@router.get("/recipe/id/{recipe_id}", response_model=RecipeResponse)
async def get_recipe_by_id(recipe_id: int, db: Session = Depends(get_session)):
    try:
        query = select(Recipe).where(Recipe.id == recipe_id)
        recipe = db.exec(query).first()

        if not recipe:
            raise HTTPException(
                status_code=404,
                detail={"status": "error", "message": "Recipe not found"},
            )

    except Exception as e:
        logger.error(f"Error in fetching recipe: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "An unexpected error occurred while fetching the recipe. Please try again later.",
            },
        )

    return {
        "status": "success",
        "message": "Recipe fetched successfully",
        "data": recipe,
    }


@router.post("/recipes/user", response_model=RecipeByUserResponse)
async def get_recipes_by_user_id(
    user: UserRecipesRequest, db: Session = Depends(get_session)
):
    print("user_id", user)
    try:
        query = select(Recipe).where(Recipe.user_id == user.user_id)
        recipes = db.exec(query).all()
    except Exception as e:
        logger.error(f"Error in fetching recipes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "An unexpected error occurred while fetching the recipes. Please try again later."
                + str(e),
            },
        )

    return {
        "status": "success",
        "message": "Recipes fetched successfully",
        "data": recipes,
    }


@router.get("/recipes")
async def get_recipes(db: Session = Depends(get_session)):
    try:
        # reverse order
        recipes = db.exec(select(Recipe).order_by(Recipe.id.desc())).all()
        return {
            "status": "success",
            "message": "Recipes fetched successfully",
            "data": recipes,
        }
    except Exception as e:
        logger.error(f"Error in fetching recipes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": f"Error fetching recipes: {str(e)}"},
        )


def insert_recipe_to_db(recipe: RecipeData, db: Session):
    try:
        db.add(recipe)
        db.commit()
        db.refresh(recipe)
        return recipe
    except Exception as e:
        logger.error(f"Error in inserting recipe to db: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": f"Error inserting recipe to db: {str(e)}",
            },
        )
