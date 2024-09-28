from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from dotenv import load_dotenv
from database import create_db_and_tables
from api.routers import recipe  
from fastapi.staticfiles import StaticFiles
import os

load_dotenv()

app = FastAPI()

app.mount(
    "/images",
    StaticFiles(directory=os.getcwd().replace("\\", "/") + "/images"),
    name="images",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)


@app.get("/")
def read_root():
    return {"server": "running"}


app.include_router(recipe.router)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
