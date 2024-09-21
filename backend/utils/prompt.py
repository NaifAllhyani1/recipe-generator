def generate_recipe_by_cuisine_prompt(cuisine: str, allergy: str = None) -> str:
    prompt = f"""
    You are a world-class chef helping users create a dish. The user has all the necessary ingredients. 
    The cuisine type is {cuisine}.
    """

    if allergy:
        prompt += f"The user is allergic to {allergy}, avoid using this ingredient.\n"

    prompt += """
    Create a dish following these guidelines:
    
    1. **Dish Name**: Provide a creative and authentic name for the dish based on the cuisine.
    2. **Dish Description**: Write a 2-3 sentence description of the dish.
    3. **Cooking Steps**: Provide a detailed, step-by-step guide to cooking the dish.
    """

    return prompt


def generate_recipe_by_ingredients_prompt(
    ingredients: list[str], allergy: str = None, cuisine: str = None
) -> str:
    # Creating the base of the prompt
    prompt = f"""
    You are a world-class chef helping users create a dish based on the ingredients they have available.
    The user provides the following list of ingredients: {', '.join(ingredients)}.
    """

    # Adding cuisine information if provided
    if cuisine:
        prompt += f"The cuisine type is {cuisine}. "

    # Adding allergy information if provided
    if allergy:
        prompt += f"The user is allergic to {allergy}. Avoid using this ingredient and suggest alternatives if necessary.\n"

    # Setting clear instructions for the AI
    prompt += """
    Please follow these rules while generating the recipe:
    - Only use the provided ingredients. Do not add new ingredients unless they are essential for the dish (in which case, provide a reason why).
    - If a cuisine is provided, make sure the dish aligns with it.
    - Avoid using any ingredients that may trigger the provided allergy, and suggest alternatives if necessary.

    Create a recipe following these guidelines:
    
    1. **Dish Name**: Suggest a creative and authentic name for the dish based on the ingredients and cuisine (if provided).
    2. **Dish Description**: Write a 2-3 sentence description explaining the flavors, key ingredients, and how the dish relates to the provided cuisine or a generic style.
    3. **Cooking Steps**: Provide clear, step-by-step instructions on how to make the dish. Use only the listed ingredients, and include preparation methods, cooking times, temperatures, and any special tips.
    """

    return prompt
