from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4


class OverlayBase(SQLModel):
    riot_id: str
    hdev_api_key: str
    # hdev_key: str
    # text_color: str
    # primary_color: str
    # bg_color: str
    # progress_rank_color: str
    # progress_rank_bg_color: str
    # alpha_bg: bool
    # alpha_grad_bg: bool
    # wl_stat: bool
    # progress_rank: bool
    # last_match_points: bool


class Overlay(OverlayBase, table=True):
    uuid: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )


class OverlayCreate(OverlayBase):
    pass
