from fastapi import APIRouter
import pandas
from pydantic import BaseModel
import json
import sys
sys.path.append('C:\Development\Projects\invest-dashboard')

from backend.api.tinkoffApi.TinkoffApi import TinkoffApi

stock_router = APIRouter()


class TickersFilterValues(BaseModel):
    ITEMS_ON_PAGE: int
    PAGE: int


class TickerCandlesParams(BaseModel):
    ticker: str
    dateFrom: int

token = 't.9fxy_N36rju5XJU9hzW0iHe-mYoymkxpdFxTTuWq91OLhdrNUSWyXWnPKWvF4q8AJDaFUQwKgPoTwH1ykdh-FQ'

@stock_router.post('/get-tickers')
async def get_tickers(filter_values: TickersFilterValues):
    # import os

    #
    # current_directory = os.path.dirname(__file__)
    # parent_directory = os.path.dirname(current_directory)
    #
    # file_path = os.path.join(parent_directory, 'data', 'Tickers.xlsx')
    #
    # df = pandas.read_excel(file_path, header=None)
    #
    # tickers = list(df[0].values)
    #


    tinkoff_obj = TinkoffApi(token)

    tickers_list = await tinkoff_obj.get_shares_list()

    res_list = []

    for ticker in tickers_list.instruments:
        res_list.append({
            'name':  ticker.name,
            'ticker': ticker.ticker,
            'currency': ticker.currency,
            'exchange': ticker.exchange,
            'sector': ticker.sector,
            'nominal': ticker.nominal.currency,
            'uid': ticker.uid,
            'logoName': ticker.brand.logo_name,
            'logoBaseColor': ticker.brand.logo_base_color,
            'logoTextColor': ticker.brand.text_color
        })


    ind_from = (filter_values.PAGE - 1) * filter_values.ITEMS_ON_PAGE
    ind_end = filter_values.PAGE * filter_values.ITEMS_ON_PAGE

    return json.dumps(res_list[ind_from:ind_end])

@stock_router.post('/get-tickerCandles')
async def get_ticker_candles(params: TickerCandlesParams):

    tinkoff_obj = TinkoffApi(token)

    ticker_candle = await tinkoff_obj.get_ticker_candle(params)

    return ticker_candle
