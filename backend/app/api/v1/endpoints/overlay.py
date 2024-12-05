from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.crud import overlay as crud
from app.db.session import get_session
from app.schemas.overlay import OverlaySchema

router = APIRouter()


@router.get("/", response_model=list[OverlaySchema])
async def get_overlays(session: AsyncSession = Depends(get_session)):
    return await crud.get_overlays(session)


@router.get("/{overlay_id}", response_model=OverlaySchema)
async def get_overlay(overlay_id: str, session: AsyncSession = Depends(get_session)):
    return await crud.get_overlay(overlay_id, session)


@router.post("/", response_model=OverlaySchema)
async def create_overlay(overlay: OverlaySchema, session: AsyncSession = Depends(get_session)):
    return await crud.create_overlay(overlay, session)
