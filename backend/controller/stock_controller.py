from fastapi import APIRouter
import pandas
from pydantic import BaseModel
import json
import os
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


class TickerLastPriceParams(BaseModel):
    figi: list


token = 't.9fxy_N36rju5XJU9hzW0iHe-mYoymkxpdFxTTuWq91OLhdrNUSWyXWnPKWvF4q8AJDaFUQwKgPoTwH1ykdh-FQ'

@stock_router.post('/get-tickers')
async def get_tickers(filter_values: TickersFilterValues):
    current_directory = os.path.dirname(__file__)
    parent_directory = os.path.dirname(current_directory)

    file_path = os.path.join(parent_directory, 'data', 'TickersData.csv')

    df = pandas.read_csv(file_path, encoding='UTF-8')

    res_list = []

    for index, row in df.iterrows():
        ticker = row

        res_list.append({
            'name':  ticker["name"],
            'figi': ticker.figi,
            'ticker': ticker.ticker,
            'currency': ticker.currency,
            'exchange': ticker.exchange,
            'sector': ticker.sector,
            'nominal': ticker.nominal[ticker.nominal.find("currency=") + 10:ticker.nominal.find(",") - 1],
            'uid': ticker.uid,
            'logoName': ticker.brand[ticker.brand.find('logo_name') + 11:ticker.brand.find(",") - 1],
            'logoBaseColor': ticker.brand[ticker.brand.find('logo_base_color') + 17:ticker.brand.rfind(",") - 1],
            'logoTextColor': ticker.brand[ticker.brand.find('text_color') + 11:ticker.brand.rfind(")")]
        })


    ind_from = (filter_values.PAGE - 1) * filter_values.ITEMS_ON_PAGE
    ind_end = filter_values.PAGE * filter_values.ITEMS_ON_PAGE

    res_obj = {
        "list": res_list[ind_from:ind_end],
        "last_page_number": (len(res_list) + filter_values.ITEMS_ON_PAGE - 1) // filter_values.ITEMS_ON_PAGE
    }

    return json.dumps(res_obj)

@stock_router.post('/get-tickerCandles')
async def get_ticker_candles(params: TickerCandlesParams):

    tinkoff_obj = TinkoffApi(token)

    ticker_candle = await tinkoff_obj.get_ticker_candle(params)

    return ticker_candle

@stock_router.post('/get-lastTickerPrice')
async def get_ticker_candles(params: TickerLastPriceParams):

    tinkoff_obj = TinkoffApi(token)

    last_price_response = await tinkoff_obj.get_last_price(params)

    res_list = []


    for last_price in last_price_response.last_prices:
        res_list.append(last_price.price.units + float(f'0.{last_price.price.nano}'))

    res_obj = {
        'prices': res_list
    }

    return json.dumps(res_obj)

@stock_router.get('/generateTickersData')
async def generate_tickers_data():
    import csv

    data = []
    tinkoff_obj = TinkoffApi(token)

    tickers_list = await tinkoff_obj.get_shares_list()

    current_directory = os.path.dirname(__file__)
    parent_directory = os.path.dirname(current_directory)

    file_path = os.path.join(parent_directory, 'data', 'TickersData.csv')

    with open(file_path, 'w') as csvfile:
        for ticker in tickers_list.instruments:
            data.append(vars(ticker))

        writer = csv.DictWriter(csvfile, fieldnames=vars(tickers_list.instruments[0]).keys())

        writer.writeheader()

        writer.writerows(data)
