import uuid as uuid_pkg

from pydantic import BaseModel

from app.models.overlay import OverlayBase


class OverlaySchema(BaseModel):
    uuid: uuid_pkg.UUID
    nickname: str
    tag: str

    class Config:
        orm_mode: bool = True

class OverlayCreate(OverlayBase):
    pass 

class OverlayRead(OverlayBase):
    uuid: uuid_pkg.UUID

    class Config:
        orm_mode: bool = True