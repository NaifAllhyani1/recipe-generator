from utils.prompt import (
    generate_recipe_by_ingredients_prompt,
    generate_recipe_by_cuisine_prompt,
)
from fastapi import HTTPException

# from sqlmodel import Session
import json
import logging

logger = logging.getLogger("my_app")
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()


async def generate_recipe_from_prompt(recipe):
    if recipe.has_all_ingredients and recipe.cuisine:
        prompt = generate_recipe_by_cuisine_prompt(recipe.cuisine, recipe.allergies)
    else:
        prompt = generate_recipe_by_ingredients_prompt(
            recipe.ingredients, recipe.allergies, recipe.cuisine
        )

    try:
        # Generate recipe from OpenAI
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
        )

        # Log the full response
        logger.info(f"OpenAI API response: {completion}")

        # Check if choices exist
        if not completion.choices:
            raise ValueError("No choices returned from OpenAI API.")

        generated_content = completion.choices[0].message.content

        # Check for empty content
        if not generated_content:
            logger.error("Received empty content from OpenAI.")
            raise HTTPException(
                status_code=500, detail="Received empty content from OpenAI."
            )

        recipe_data = json.loads(generated_content)

        return recipe_data

    except Exception as e:
        logger.error(f"Failed to generate recipe from OpenAI: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Error generating recipe from OpenAI: {str(e)}"
        )


# Generate image based on the recipe description
# async def generate_recipe_image(description: str):
#     try:
#         response = client.images.generate(
#             model="dall-e-3",
#             prompt=f"A realistic, appetizing image of: {description}",
#             size="1024x1024",
#             quality="standard",
#             n=1,
#         )
#         return response.data[0].url
#     except Exception as e:
#         logger.error(f"Error generating image: {str(e)}")
#         return None
