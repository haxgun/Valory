import ast
from os import environ
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

dotenv_file = BASE_DIR / '.env'
if dotenv_file.is_file():
    load_dotenv(dotenv_file)

DEBUG = ast.literal_eval(environ.get('DEBUG'))

PROJECT_NAME = environ.get('PROJECT_NAME')
VERSION = environ.get('VERSION')