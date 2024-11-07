from uuid import UUID

from pydantic import BaseModel

class OverlaySchema(BaseModel):
    uuid: UUID
    nickname: str
    tag: str

    class Config:
        orm_mode = True  # Включает поддержку ORM для SQLAlchemy моделей
