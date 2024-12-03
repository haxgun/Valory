import uuid as uuid_pkg

from pydantic import BaseModel

from app.models.overlay import OverlayBase


class OverlaySchema(BaseModel):
    uuid: uuid_pkg.UUID
    nickname: str
    tag: str

    model_config = {
        "from_attributes": True
    }

class OverlayCreate(OverlayBase):
    pass 

class OverlayRead(OverlayBase):
    uuid: uuid_pkg.UUID

    model_config = {
        "from_attributes": True
    }