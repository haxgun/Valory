import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.db import get_session
from app.models.overlays import Overlay, OverlayCreate

router = APIRouter()


@router.get('/', response_model=list[Overlay])
async def get_overlays(session: AsyncSession = Depends(get_session)):
    result = await session.exec(select(Overlay))
    overlays = result.all()
    return [Overlay(id=overlay.id, riot_id=overlay.riot_id, hdev_api_key=overlay.hdev_api_key) for overlay in overlays]

@router.get("/{overlay_id}")
async def get_overlay(overlay_id: uuid.UUID, session: AsyncSession = Depends(get_session)):
    statement = select(Overlay).where(Overlay.id == overlay_id)
    result = await session.exec(statement)
    overlay = result.first()

    if overlay is None:
        raise HTTPException(status_code=404, detail="Overlay not found")

    return overlay


@router.post("/")
async def create_overlay(overlay: OverlayCreate, session: AsyncSession = Depends(get_session)):
    overlay = Overlay(riot_id=overlay.riot_id, hdev_api_key=overlay.hdev_api_key)
    session.add(overlay)
    await session.commit()
    await session.refresh(overlay)
    return overlay