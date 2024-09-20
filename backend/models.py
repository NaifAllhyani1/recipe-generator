from sqlmodel import Field, SQLModel, create_engine


class Recipe(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    ingredients: str | None = None
    cuisine: str | None = None
    allergies : str | None = None
    description: str
    image: str
