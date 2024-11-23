from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.overlay import Overlay
# Импорты для моделей, схем и сессий
from app.schemas.overlay import OverlaySchema, OverlayCreate  # Pydantic-схема OverlayCreate
from app.db.session import get_db  # Асинхронная сессия базы данных

router = APIRouter()

async def get_overlays(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Overlay))
    overlays = result.scalars().all()
    return [OverlayCreate(riotId=overlay.riotId, hdevApiKey=overlay.hdevApiKey, uuid=overlay.uuid) for overlay in overlays]

async def get_overlay(overlay_id: str, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Overlay).filter(Overlay.uuid == overlay_id))
    overlay = result.scalars().first()
    if overlay is None:
        raise HTTPException(status_code=404, detail="Overlay not found")
    return overlay

async def add_overlay(overlay: OverlaySchema, session: AsyncSession = Depends(get_db)):
    new_overlay = Overlay(riotId=overlay.riotId, hdevApiKey=overlay.hdevApiKey)
    session.add(new_overlay)
    await session.commit()
    await session.refresh(new_overlay)
    return new_overlay
