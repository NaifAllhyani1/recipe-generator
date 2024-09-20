from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()



@router.post("/generate-recipe")
async def generate_recipe():
    pass