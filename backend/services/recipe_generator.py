from utils.openai_client import client
from utils.prompt import (
    generate_recipe_by_ingredients_prompt,
    generate_recipe_by_cuisine_prompt,
)
from fastapi import HTTPException

from models import Recipe

from sqlmodel import Session
import json
import logging
import os
import requests

logger = logging.getLogger("my_app")
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

IMAGE_DIR = os.getcwd().replace("\\", "/") + "/images"

if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)


async def generate_recipe_from_prompt(recipe, db: Session):
    if recipe.has_all_ingredients and recipe.cuisine:
        prompt = generate_recipe_by_cuisine_prompt(recipe.cuisine, recipe.allergies)

    if not recipe.has_all_ingredients and recipe.ingredients:
        prompt = generate_recipe_by_ingredients_prompt(
            recipe.ingredients, recipe.allergies, recipe.cuisine
        )

    try:
        # Generate recipe from OpenAI
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
        )

    except Exception as e:
        logger.error(f"Failed to generate recipe from OpenAI: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Error generating recipe from OpenAI: {str(e)}"
        )

    generated_content = completion.choices[0].message.content
    print("Raw response:", generated_content)
    print("Raw response length:", len(generated_content))
    generated_content = generated_content.strip()
    print("Trimmed response length:", len(generated_content))

    try:
        recipe_data = json.loads(generated_content)
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error parsing JSON: {str(e)}")

    image_url = await generate_recipe_image(recipe_data["dish_description"])

    db_recipe = Recipe(
        dish_name=recipe_data["dish_name"],
        cuisine=recipe_data["cuisine"],
        dish_description=recipe_data["dish_description"],
        ingredients=recipe_data["ingredients"],
        cooking_steps=recipe_data["cooking_steps"],
        image_url=f"/images/{os.path.basename(image_url)}",
        user_id=recipe.user_id,
    )

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

        image_url = response.data[0].url

        image_path = os.path.join(IMAGE_DIR, f"{description.replace(' ', '_')}.png")

        img_response = requests.get(image_url)
        img_response.raise_for_status()

        with open(image_path, "wb") as f:
            f.write(img_response.content)

        return image_path
    except Exception as e:
        logger.error(f"Error generating image: {str(e)}")
        return None
