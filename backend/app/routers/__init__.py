from fastapi import APIRouter

from app.routers import overlays

api_router = APIRouter()
api_router.include_router(overlays.router, prefix="/overlay", tags=["overlay"])