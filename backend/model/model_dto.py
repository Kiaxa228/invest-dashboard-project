from pydantic import BaseModel


class RegisterData(BaseModel):
    username: str
    password: str


class ProfileDto(BaseModel):
    profile_id: int = None
    username: str = None
    balance: float = 0
    investment: float = 0
    dollars: float = 0
    euro: float = 0
    yuan: float = 0
    bitcoin: float = 0
