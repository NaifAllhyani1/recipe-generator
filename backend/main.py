from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from dotenv import load_dotenv
from database import create_db_and_tables
from api.routers import recipe  # Changed this line

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, adjust this in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Root endpoint for basic health check
@app.get("/")
def read_root():
    return {"server": "running"}

app.include_router(recipe.router)

# Initialize the database
@app.on_event("startup")
def on_startup():
    create_db_and_tables()
