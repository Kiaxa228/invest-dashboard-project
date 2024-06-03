from pydantic import BaseModel


class BuySellFilterValues(BaseModel):
    username: str
    currency: str
    value: int
