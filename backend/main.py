from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from Valory.backend.app import settings
from Valory.backend.app.api import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Выполняется при старте приложения
    await init_db()
    print("Application startup complete.")

    yield  # Контроль передается приложению

    # Выполняется при завершении работы приложения
    print("Application shutdown complete.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")
