from pydantic import BaseModel


class RegisterData(BaseModel):
    username: str
    password: str


class ProfileDto(BaseModel):
    profile_id: int = None
    username: str = None
    balance: float
    investment: float
    dollars: float
    euro: float
    yuan: float
    bitcoin: float
