from tinkoff.invest.clients import AsyncClient
import tracemalloc
import asyncio
from tinkoff.invest.utils import now
from datetime import timedelta
from tinkoff.invest import CandleInterval, Client
from tinkoff.invest.schemas import CandleSource

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

    async def get_ticker_candle(self, params):
        async with self.client as client:
            candles = client.get_all_candles( instrument_id="BBG004730N88",
                                              from_=now() - timedelta(minutes=10),
                                              interval=CandleInterval.CANDLE_INTERVAL_1_MIN,
                                              candle_source_type=CandleSource.CANDLE_SOURCE_UNSPECIFIED)
            async for candle in candles:
                print(candle)

    async def get_shares_list(self):
        async with self.client as client:
            shares = await client.instruments.shares()

            return shares

    async def get_last_price(self, params):
        async with self.client as client:
            last_price = await client.market_data.get_last_prices(figi=params.figi)

            return last_price
