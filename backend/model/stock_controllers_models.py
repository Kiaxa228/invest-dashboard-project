from enum import Enum
from pydantic import BaseModel
from tinkoff.invest import CandleInterval


class CatalogCategory(Enum):
    SHARES = 0
    CURRENCIES = 1
    FUNDS = 2
    BONDS = 3


class TickersFilterValues(BaseModel):
    ITEMS_ON_PAGE: int
    PAGE: int
    TICKER_NAME: str
    CATEGORY: CatalogCategory


class TickerCandlesParams(BaseModel):
    uid: str
    timeType: str
    timeAmount: int
    interval: CandleInterval


class TickerParams(BaseModel):
    ticker: str
    CATEGORY: CatalogCategory


class TickerLastPriceParams(BaseModel):
    figi: list
