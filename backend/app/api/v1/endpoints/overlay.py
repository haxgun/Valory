from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.crud.user import create_user
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=list[Overlay])
async def get_overlays(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Overlay))
    overlays = result.scalars().all()
    return [Overlay(riotId=overlay.riotId, hdevApiKey=overlay.hdevApiKey, uuid=overlay.uuid) for overlay in overlays]

@router.get("/{overlay_id}", response_model=OverlaySchema)
async def get_overlay(overlay_id: str, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Overlay).filter(Overlay.uuid == overlay_id))
    overlay = result.scalars().first()
    if overlay is None:
        raise HTTPException(status_code=404, detail="Overlay not found")
    return overlay

@router.post("/")
async def add_overlay(overlay: OverlayCreate, session: AsyncSession = Depends(get_db)):
    overlay = Overlay(riotId=overlay.riotId, hdevApiKey=overlay.hdevApiKey)
    session.add(overlay)
    await session.commit()
    await session.refresh(overlay)
    return overlay