import uuid
from pydantic import BaseModel, Field


class OverlayBase(BaseModel):
    background_switch: bool = Field(default=True)
    progressbar_switch: bool = Field(default=True)
    statistics_switch: bool = Field(default=False)

    background_color: str = Field(default="#07090e")
    text_color: str = Field(default="#ffffff")
    primary_color: str = Field(default="#bebebf")
    progressbar_color: str = Field(default="#00ffe3")
    win_color: str = Field(default="#00ffe3")
    lose_color: str = Field(default="#ff7986")


class OverlayCreate(OverlayBase):
    user_id: int


class OverlayUpdate(BaseModel):
    background_switch: bool | None = None
    progressbar_switch: bool | None = None
    statistics_switch: bool | None = None

    background_color: str | None = None
    text_color: str | None = None
    primary_color: str | None = None
    progressbar_color: str | None = None
    win_color: str | None = None
    lose_color: str | None = None


class OverlayResponse(OverlayBase):
    id: uuid.UUID
    user_id: int

    class Config:
        from_attributes = True
