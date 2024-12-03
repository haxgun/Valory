from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.overlay import Overlay
from app.db.session import get_db

router = APIRouter()

async def get_overlays(session: AsyncSession = Depends(get_db)) -> list[Overlay]:
    result = await session.execute(select(Overlay))
    overlays = result.scalars().all()
    return overlays

async def get_overlay(overlay_id: str, session: AsyncSession = Depends(get_db)) -> Overlay:
    result = await session.execute(select(Overlay).where(Overlay.uuid == overlay_id))
    overlay = result.scalars().first()
    if overlay is None:
        raise HTTPException(status_code=404, detail="Overlay not found")
    return overlay

async def add_overlay(overlay_data: Overlay, session: AsyncSession = Depends(get_db)) -> Overlay:
    new_overlay = Overlay(**overlay_data.dict(exclude_unset=True))
    session.add(new_overlay)
    await session.commit()
    await session.refresh(new_overlay)
    return new_overlay
