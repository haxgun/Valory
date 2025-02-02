import math
import random

from app.config import settings
from fastapi import APIRouter
from fastapi.responses import RedirectResponse

router = APIRouter()

async def generate_random_string(string_length: int) -> str:
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    text = "".join(
        [
            possible[math.floor(random.random() * len(possible))]
            for i in range(string_length)
        ]
    )
    return text

@router.get("/login")
async def twitch_login():
    state = await generate_random_string(16)

    twitch_auth_url = (
        f"https://id.twitch.tv/oauth2/authorize"
        f"?response_type=code"
        f"&client_id={settings.TWITCH_CLIENT_ID}"
        f"&redirect_uri={settings.REDIRECT_URI}"
        f"&state={state}"
    )
    return RedirectResponse(url=twitch_auth_url)


@router.get("/callback")
async def twitch_callback():
    ...