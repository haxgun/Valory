from app.routers.auth import twitch
from fastapi import APIRouter

router = APIRouter()
router.include_router(twitch.router, prefix="/twitch", tags=["twitch"])
