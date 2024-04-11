from fastapi import APIRouter
import pandas
from pydantic import BaseModel

from backend.api.tinkoffApi.TinkoffApi import TinkoffApi

stock_router = APIRouter()


class TickersFilterValues(BaseModel):
    ITEMS_ON_PAGE: int
    PAGE: int


class TickerCandlesParams(BaseModel):
    ticker: str
    dateFrom: int


@stock_router.post('/get-tickers')
async def get_tickers(values: TickersFilterValues):
    import os
    import json

    current_directory = os.path.dirname(__file__)
    parent_directory = os.path.dirname(current_directory)

    file_path = os.path.join(parent_directory, 'data', 'Tickers.xlsx')

    df = pandas.read_excel(file_path, header=None)

    tickers = list(df[0].values)

    ind_from = (values.PAGE - 1) * values.ITEMS_ON_PAGE
    ind_end = values.PAGE * values.ITEMS_ON_PAGE

    return json.dumps(tickers[ind_from:ind_end])

@stock_router.post('/get-tickerCandles')
async def get_ticker_candles(params: TickerCandlesParams):

    return await TinkoffApi.get_ticker_candle(params)
