from tinkoff.invest.clients import AsyncClient


class TinkoffApi:
    token = 't.9fxy_N36rju5XJU9hzW0iHe-mYoymkxpdFxTTuWq91OLhdrNUSWyXWnPKWvF4q8AJDaFUQwKgPoTwH1ykdh-FQ'

    async def __aenter__(self):
        self.client = AsyncClient(self.token)
        await self.client.__aenter__()
        return self

    async def __aexit__(self, exc_type, exc_value, traceback):
     await self.client.__aexit__(exc_type, exc_value, traceback)

    async def get_ticker_candle(self, params):
        async with self.client as client:
            brands = client.instruments.get_brands()
            for brand in brands.brands:
                print(brand)

