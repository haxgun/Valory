from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.api import api_router
from app.db.session import init_db
from app import settings


# Определение lifespan для управления событиями старта и завершения
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Выполняется при старте приложения
    await init_db()
    print("Application startup complete.")

    yield  # Передача управления основному приложению

    # Выполняется при завершении приложения
    print("Application shutdown complete.")


# Создание экземпляра FastAPI с lifespan
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# Подключение CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Замените "*" на список доменов в production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутов
app.include_router(api_router, prefix="/api/v1")


# Тестовый маршрут
@app.get("/")
async def read_root():
    return {"message": "Welcome to the API!"}
