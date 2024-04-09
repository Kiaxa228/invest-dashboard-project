from fastapi import APIRouter
import pandas

stock_router = APIRouter()

@stock_router.get('/get-tickers')
async def get_tickers():
    df = pandas.read_excel('../data/Tickers.xlsx')
    return df.to_json()