from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from db import init_db, get_session
from models import Overlay, OverlayCreate

from schemas import OverlaySchema

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/overlays", response_model=list[Overlay])
async def get_overlays(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Overlay))
    overlays = result.scalars().all()
    return [Overlay(nickname=overlay.nickname, tag=overlay.tag, uuid=overlay.uuid) for overlay in overlays]

@app.get("/overlay/{overlay_id}", response_model=OverlaySchema)
async def get_overlay(overlay_id: str, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Overlay).filter(Overlay.uuid == overlay_id))
    overlay = result.scalars().first()
    if overlay is None:
        raise HTTPException(status_code=404, detail="Overlay not found")
    return overlay

@app.post("/overlay")
async def add_overlay(overlay: OverlayCreate, session: AsyncSession = Depends(get_session)):
    overlay = Overlay(nickname=overlay.nickname, tag=overlay.tag)
    session.add(overlay)
    await session.commit()
    await session.refresh(overlay)
    return overlay