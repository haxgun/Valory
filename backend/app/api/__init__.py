from fastapi import APIRouter
from app.api.api_v1.endpoints import overlay

api_router = APIRouter()
api_router.include_router(overlay.router, prefix="/overlay", tags=["overlay"])
