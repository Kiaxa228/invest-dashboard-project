import numpy as np
from fastapi import APIRouter
import pandas
from pydantic import BaseModel
import json
import datetime
from enum import Enum
from tinkoff.invest import CandleInterval
import os
import sys


current_directory = os.path.dirname(__file__)
parent_directory = os.path.dirname(current_directory)
project_directory = os.path.dirname(parent_directory)

sys.path.append(project_directory)

from backend.api.tinkoffApi.TinkoffApi import TinkoffApi

stock_router = APIRouter()


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


token = 't.9fxy_N36rju5XJU9hzW0iHe-mYoymkxpdFxTTuWq91OLhdrNUSWyXWnPKWvF4q8AJDaFUQwKgPoTwH1ykdh-FQ'

@stock_router.post('/get-tickers')
async def get_tickers(filter_values: TickersFilterValues):

    category_list = get_category_data(filter_values.CATEGORY, filter_values.TICKER_NAME)

    ind_from = (filter_values.PAGE - 1) * filter_values.ITEMS_ON_PAGE
    ind_end = filter_values.PAGE * filter_values.ITEMS_ON_PAGE

    res_obj = {
        "list": category_list[ind_from:ind_end],
        "last_page_number": (len(category_list) + filter_values.ITEMS_ON_PAGE - 1) // filter_values.ITEMS_ON_PAGE
    }

    return json.dumps(res_obj)

@stock_router.post('/get-dataByTickerName')
async def get_data_by_ticker_name(ticker_params: TickerParams):
    ticker_data = get_category_data(ticker_params.CATEGORY, ticker_params.ticker)

    last_ticker_price_obj = await get_last_ticker_price(TickerLastPriceParams(figi=[ticker_data[0].get('figi')]))

    ticker_candles_obj = await get_ticker_candles(TickerCandlesParams(uid=ticker_data[0].get('uid'), timeType='y', timeAmount=1, interval=5))

    tinkoff_obj = TinkoffApi(token)

    category_data = await tinkoff_obj.get_ticker_data(ticker_data)

    return last_ticker_price_obj, ticker_candles_obj, category_data



def get_filepath_to_datadir(file_name):
    current_directory = os.path.dirname(__file__)
    parent_directory = os.path.dirname(current_directory)
    
    return os.path.join(parent_directory, 'data', file_name)
    
def get_category_data(category, ticker_name):
    res_list = []

    if category == CatalogCategory.SHARES:

        file_path = get_filepath_to_datadir('TickersData.csv')

        df = pandas.read_csv(file_path, encoding='UTF-8')

        if ticker_name:
            df_ticker_filtered = df[df['ticker'].str.contains(ticker_name.upper())]
            df_name_filtered = df[df['name'].str.lower().str.contains(ticker_name.lower())]

            df_combined = pandas.concat([df_ticker_filtered, df_name_filtered])

            df_combined.drop_duplicates(inplace=True)

            df = df_combined

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

    elif category == CatalogCategory.CURRENCIES:
        file_path = get_filepath_to_datadir('CurrenciesData.csv')

        df = pandas.read_csv(file_path, encoding='UTF-8')

        if ticker_name:
            df_ticker_filtered = df[df['ticker'].str.contains(ticker_name.upper())]
            df_name_filtered = df[df['name'].str.lower().str.contains(ticker_name.lower())]

            df_combined = pandas.concat([df_ticker_filtered, df_name_filtered])

            df_combined.drop_duplicates(inplace=True)

            df = df_combined

        for index, row in df.iterrows():
            ticker = row

            res_list.append({
                'name':  ticker["name"],
                'figi': ticker.figi,
                'ticker': ticker.ticker,
                'currency': ticker.currency,
                'exchange': ticker.exchange,
                'nominal': ticker.nominal[ticker.nominal.find("currency=") + 10:ticker.nominal.find(",") - 1],
                'uid': ticker.uid,
                'logoName': ticker.brand[ticker.brand.find('logo_name') + 11:ticker.brand.find(",") - 1],
                'logoBaseColor': ticker.brand[ticker.brand.find('logo_base_color') + 17:ticker.brand.rfind(",") - 1],
                'logoTextColor': ticker.brand[ticker.brand.find('text_color') + 11:ticker.brand.rfind(")")]
            })

    return res_list

@stock_router.post('/get-tickerCandles')
async def get_ticker_candles(params: TickerCandlesParams):

    tinkoff_obj = TinkoffApi(token)

    res_list = await tinkoff_obj.get_ticker_candles(params)

    try:
        res_obj = {
            'candles': res_list,
            'growPerDayAmount': res_list[-1].get('close') - res_list[-2].get('close'),
            'growPerDayPercent': (res_list[-1].get('close') - res_list[-2].get('close')) / res_list[-2].get('close'),
            'growPerYear': res_list[-1].get('close') - res_list[0].get('close'),
            'growPerYearPercent': (res_list[-1].get('close') - res_list[0].get('close')) / res_list[0].get('close')
        }
    except:
        res_obj = {
            'candles': res_list,
            'growPerDay': None,
            'growPerYear': None
        }

    return json.dumps(res_obj)

@stock_router.post('/get-lastTickerPrice')
async def get_last_ticker_price(params: TickerLastPriceParams):

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

    file_path = get_filepath_to_datadir('TickersData.csv')

    with open(file_path, 'w', encoding='UTF-8') as csvfile:
        for ticker in tickers_list.instruments:
            data.append(vars(ticker))

        writer = csv.DictWriter(csvfile, fieldnames=vars(tickers_list.instruments[0]).keys())

        writer.writeheader()

        writer.writerows(data)

@stock_router.get('/generateCurrenciesData')
async def generate_currencies_data():
    import csv

    data = []
    tinkoff_obj = TinkoffApi(token)

    currencies_list = await tinkoff_obj.get_currencies_list()

    file_path = get_filepath_to_datadir('CurrenciesData.csv')

    with open(file_path, 'w', encoding='UTF-8') as csvfile:
        for currency in currencies_list.instruments:
            data.append(vars(currency))

        writer = csv.DictWriter(csvfile, fieldnames=vars(currencies_list.instruments[0]).keys())

        writer.writeheader()

        writer.writerows(data)
