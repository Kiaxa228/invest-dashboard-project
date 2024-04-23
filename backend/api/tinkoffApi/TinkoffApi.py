from tinkoff.invest.clients import AsyncClient
import tracemalloc
import asyncio
from tinkoff.invest.utils import now
from datetime import timedelta
from tinkoff.invest import CandleInterval, Client
from tinkoff.invest.schemas import CandleSource
import sys
sys.path.append('C:\Development\Projects\invest-dashboard')


tracemalloc.start()

class TinkoffApi:
    def __init__(self, token):
        self.token = token
        self.client = AsyncClient(self.token)

    async def __aenter__(self):
        self.client = AsyncClient(self.token)
        await self.client.__aenter__()
        return self

    async def __aexit__(self, exc_type, exc_value, traceback):
        await self.client.__aexit__(exc_type, exc_value, traceback)
        self.client = None

    async def get_ticker_candles(self, params):
        async with self.client as client:
            time_to_minus = timedelta(days=1)

            if params.timeType == 'h':
                time_to_minus = timedelta(hours=params.timeAmount)
            elif params.timeType == 'm':
                time_to_minus = timedelta(minutes=params.timeAmount)
            elif params.timeType == 's':
                time_to_minus = timedelta(seconds=params.timeAmount)
            elif params.timeType == 'y':
                time_to_minus = timedelta(days=params.timeAmount * 365)

            candles = client.get_all_candles( instrument_id=params.uid,
                                              from_=now() - time_to_minus,
                                              interval=params.interval,
                                              candle_source_type=CandleSource.CANDLE_SOURCE_UNSPECIFIED)


            res_list = []

            async for candle in candles:
                res_list.append({
                    'close': candle.close.units + float(f'0.{candle.close.nano}'),
                    'volume': candle.volume,
                    'time': candle.time.isoformat()
                })

            return res_list

    async def get_shares_list(self):
        async with self.client as client:
            shares = await client.instruments.shares()

            return shares

    async def get_currencies_list(self):
        async with self.client as client:
            currencies = await client.instruments.currencies()

            return currencies

    async def get_last_price(self, params):
        async with self.client as client:
            last_price = await client.market_data.get_last_prices(figi=params.figi)

            return last_price
