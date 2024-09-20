from fastapi import FastAPI
from dotenv import load_dotenv
from backend.database import (
    create_db_and_tables,
)  # Make sure to use the correct import path
from api.routers import router as api_router  # Import the main router from your routers

load_dotenv()

app = FastAPI()


# Root endpoint for basic health check
@app.get("/")
def read_root():
    return {"server": "running"}


# Include all routers from the 'api/routers' directory
app.include_router(api_router)


# Initialize the database
@app.on_event("startup")
def on_startup():
    create_db_and_tables()
