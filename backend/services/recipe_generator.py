from openai import OpenAI
from utils.openai_client import client
from utils.prompt import generate_recipe_by_ingredients_prompt, generate_recipe_by_cuisine_prompt
import json
import logging

logger = logging.getLogger("my_app")

async def generate_recipe_from_prompt(recipe):
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
    return json.loads(generated_content)