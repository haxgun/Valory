from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from app.settings import DATABASE_URL
from app.models import overlays

engine = create_async_engine(DATABASE_URL, echo=False)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session():
    async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        yield session
