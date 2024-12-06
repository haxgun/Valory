from os import environ
from pathlib import Path
from dotenv import load_dotenv


def str_to_bool(value: str) -> bool:
    return value.lower() in ("true", "1", "yes")

BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent

dotenv_file: Path = BASE_DIR / ".env"
if dotenv_file.is_file():
    load_dotenv(dotenv_file)

PROJECT_NAME: str = environ.get("PROJECT_NAME")

DEBUG: bool = str_to_bool(environ.get("DEBUG", "False"))

PROJECT_NAME: str = environ.get("PROJECT_NAME")
VERSION: str = environ.get("VERSION")

DATABASE_LOGIN: str = environ.get("DATABASE_LOGIN")
DATABASE_PASSWORD: str = environ.get("DATABASE_PASSWORD")
DATABASE_NAME: str = environ.get("DATABASE_NAME")
DATABASE_PORT: int = int(environ.get("DATABASE_PORT", 5432))

DATABASE_URL: str = f"postgresql+asyncpg://{DATABASE_LOGIN}:{DATABASE_PASSWORD}@localhost:{DATABASE_PORT}/{DATABASE_NAME}"
