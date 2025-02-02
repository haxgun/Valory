import uuid

from sqlmodel import SQLModel, Field, Relationship


class OverlayBase(SQLModel):
    background_switch: bool = Field(default=True, nullable=False)
    progressbar_switch: bool = Field(default=True, nullable=False)
    statistics_switch: bool = Field(default=False, nullable=False)

    background_color: str = Field(default="#07090e", nullable=False)
    text_color: str = Field(default="#ffffff", nullable=False)
    primary_color: str = Field(default="#bebebf", nullable=False)
    progressbar_color: str = Field(default="#00ffe3", nullable=False)
    win_color: str = Field(default="#00ffe3", nullable=False)
    lose_color: str = Field(default="#ff7986", nullable=False)


class Overlay(OverlayBase, table=True):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        nullable=False,
    )

    user_id: int = Field(foreign_key="user.id", nullable=False)

    user: "User" = Relationship(back_populates="overlays")


class OverlayCreate(OverlayBase):
    pass
