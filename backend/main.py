from fastapi import FastAPI
from dotenv import load_dotenv
from database import create_db_and_tables
from api.routers import recipe  # Changed this line

load_dotenv()

app = FastAPI()


# Root endpoint for basic health check
@app.get("/")
def read_root():
    return {"server": "running"}


# Include all routers from the 'api/routers' directory
app.include_router(recipe.router, prefix="/api")  # Changed this line


# Initialize the database
@app.on_event("startup")
def on_startup():
    create_db_and_tables()
