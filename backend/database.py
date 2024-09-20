from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./recipes_generator.db"  #

engine = create_engine(DATABASE_URL, echo=True)


# Function to create tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Dependency for getting a session
def get_session():
    with Session(engine) as session:
        yield session
