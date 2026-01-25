from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

DATABASE_URL = "sqlite:////home/jeff/Documents/Project/graph_approximator/backend/database/database.sqlite3"

engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
        )
Base = declarative_base()

SessionLocal = sessionmaker(
        autocommit = False,
        autoflush = False,
        bind = engine
        )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



