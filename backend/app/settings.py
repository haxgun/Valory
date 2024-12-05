import secrets
from os import environ
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


def str_to_bool(value: str) -> bool:
    return value.lower() in ("true", "1", "yes")


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
    )
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:5173"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    PROJECT_NAME: str = environ.get("PROJECT_NAME")

    DEBUG: bool = str_to_bool(environ.get("DEBUG", "False"))

    PROJECT_NAME: str = environ.get("PROJECT_NAME")
    VERSION: str = environ.get("VERSION")

    DATABASE_URL: str = environ.get("DATABASE_URL")
    DEBUG_DATABASE_URL: str = environ.get("DEBUG_DATABASE_URL")


settings = Settings()
