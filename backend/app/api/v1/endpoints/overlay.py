from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.crud import overlay
from app.db.session import get_db
from app.schemas.overlay import OverlaySchema, OverlayCreate

router = APIRouter()


@router.get("/", response_model=list[OverlaySchema])
async def get_overlays(session: AsyncSession = Depends(get_db)):
    return await overlay.get_overlays(session)


@router.get("/{overlay_id}", response_model=OverlaySchema)
async def get_overlay(overlay_id: str, session: AsyncSession = Depends(get_db)):
    return await overlay.get_overlay(overlay_id, session)


@router.post("/", response_model=OverlaySchema)
async def add_overlay(overlay: OverlayCreate, session: AsyncSession = Depends(get_db)):
    return await overlay.add_overlay(overlay, session)
