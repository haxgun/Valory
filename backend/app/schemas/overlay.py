import uuid as uuid_pkg

from pydantic import BaseModel

from app.models.overlay import OverlayBase


class OverlaySchema(BaseModel):
    uuid: uuid_pkg.UUID
    nickname: str
    tag: str

    class Config:
        orm_mode = True  # Включает поддержку ORM для SQLAlchemy моделей

# Схема для создания записи
class OverlayCreate(OverlayBase):
    pass  # Наследует все поля от OverlayBase, используется для валидации входных данных

# Схема для ответа
class OverlayRead(OverlayBase):
    uuid: uuid_pkg.UUID  # Добавляем поле UUID в схему для ответа

    class Config:
        orm_mode = True  # Поддержка работы с SQLAlchemy/SQLModel объектами