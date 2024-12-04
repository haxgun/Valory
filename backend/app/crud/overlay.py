from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.overlay import Overlay
from app.schemas.overlay import OverlayCreate


async def get_overlays(session: AsyncSession) -> list[Overlay]:
    result = await session.execute(select(Overlay))
    overlays = result.scalars().all()
    return overlays


async def get_overlay(overlay_id: str, session: AsyncSession) -> Overlay:
    overlay = await session.get(Overlay, overlay_id)
    if overlay is None:
        raise HTTPException(status_code=404, detail="Overlay not found")
    return overlay


async def add_overlay(overlay_data: OverlayCreate, session: AsyncSession) -> Overlay:
    new_overlay = Overlay(**overlay_data.dict())
    session.add(new_overlay)
    await session.commit()
    await session.refresh(new_overlay)
    return new_overlay
