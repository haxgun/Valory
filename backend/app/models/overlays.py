import uuid

from sqlmodel import SQLModel, Field


class OverlayBase(SQLModel):
    riot_id: str
    hdev_api_key: str


class Overlay(OverlayBase, table=True):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        nullable=False,
    )


class OverlayCreate(OverlayBase):
    pass
