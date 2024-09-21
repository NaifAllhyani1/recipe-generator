from openai import OpenAI
from utils.openai_client import client
from utils.prompt import (
    generate_recipe_by_ingredients_prompt,
    generate_recipe_by_cuisine_prompt,
)
from models import Recipe
from sqlmodel import Session
import json
import logging

logger = logging.getLogger("my_app")


async def generate_recipe_from_prompt(recipe, db: Session):
    prompt = (
        generate_recipe_by_cuisine_prompt(recipe.cuisine, recipe.allergies)
        if recipe.has_all_ingredients and recipe.cuisine
        else generate_recipe_by_ingredients_prompt(recipe.ingredients, recipe.allergies)
    )

    try:
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
        )
    except Exception as e:
        logger.error(f"API call error: {str(e)}")
        raise

    generated_content = completion.choices[0].message.content
    recipe_data = json.loads(generated_content)

    image_url = await generate_recipe_image(recipe_data["dish_description"])

    # Create a new Recipe object
    db_recipe = Recipe(
        dish_name=recipe_data["dish_name"],
        ingredients=recipe_data["ingredients"],
        cuisine=recipe.cuisine,
        allergies=recipe.allergies,
        dish_description=recipe_data["dish_description"],
        cooking_steps=recipe_data["cooking_steps"],
        image_url=image_url
    )

    # Add the recipe to the database
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)

    return db_recipe


# Generate image based on the recipe description
async def generate_recipe_image(description: str):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"A realistic, appetizing image of: {description}",
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        logger.error(f"Error generating image: {str(e)}")
        return None
