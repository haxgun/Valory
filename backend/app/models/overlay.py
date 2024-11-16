from sqlmodel import SQLModel, Field
import uuid as uuid_pkg


class OverlayBase(SQLModel):
    riotId: str
    hdevApiKey: str
    # hdevKey: str
    # textColor: str
    # primaryColor: str
    # bgColor: str
    # progressRankColor: str
    # progressRankBgColor: str
    # alphaBg: bool
    # alphaGradBg: bool
    # wlStat: bool
    # progressRank: bool
    # lastMatchPoints: bool


class Overlay(OverlayBase, table=True):
    uuid: uuid_pkg.UUID = Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )


class OverlayCreate(OverlayBase):
    pass