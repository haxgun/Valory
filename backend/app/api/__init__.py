from fastapi import APIRouter

from app.api.v1.endpoints import overlay

api_router = APIRouter()
api_router.include_router(overlay.router, prefix="/overlays", tags=["overlays"])
