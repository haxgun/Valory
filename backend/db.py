import asyncio
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

# Укажите правильный URL базы данных
DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/valory"
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# Импорт моделей
from models import Overlay  # Импортируйте только Overlay или все модели, если их больше

async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all)  # если нужно, раскомментируйте для удаления таблиц перед созданием
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False,
    )
    async with async_session() as session:
        yield session

if __name__ == "__main__":
    asyncio.run(init_db())
