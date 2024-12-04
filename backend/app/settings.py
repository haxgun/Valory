from os import environ
from pathlib import Path

from dotenv import load_dotenv


def str_to_bool(value: str) -> bool:
    return value.lower() in ("true", "1", "yes")


BASE_DIR: str = Path(__file__).resolve().parent.parent.parent

dotenv_file: str = BASE_DIR / ".env"
if dotenv_file.is_file():
    load_dotenv(dotenv_file)
else:
    raise ImportError("⚠ .env was not found")


DEBUG: bool = str_to_bool(environ.get("DEBUG", "False"))

PROJECT_NAME: str = environ.get("PROJECT_NAME")
VERSION: str = environ.get("VERSION")

DATABASE_URL: str = environ.get("DATABASE_URL")
DEGUB_DATABASE_URL: str = environ.get("DEGUB_DATABASE_URL")
