from os import environ
from pathlib import Path

from dotenv import load_dotenv

def str_to_bool(value: str) -> bool:
    return value.lower() in ("true", "1", "yes")

BASE_DIR = Path(__file__).resolve().parent.parent.parent

dotenv_file = BASE_DIR / '.env'
if dotenv_file.is_file():
    load_dotenv(dotenv_file)
else:
    raise ImportError('⚠ .env was not found')
    

DEBUG = str_to_bool(environ.get("DEBUG", "False"))

PROJECT_NAME = environ.get('PROJECT_NAME')
VERSION = environ.get('VERSION')

DATABASE_URL = environ.get('DATABASE_URL')