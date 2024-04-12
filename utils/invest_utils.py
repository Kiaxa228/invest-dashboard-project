from moexalgo import Market, Ticker
import moexalgo.session
import pandas as pd
import time



def ticker_candles(ticker_name, begin_date, end_date, interval):
    share = Ticker(ticker_name)
    info_ticker = pd.DataFrame(share.candles(date=begin_date, till_date=end_date, period=interval))
    print(info_ticker.head())


def ticker_tradestats(ticker_name, begin_date, end_date):
    share = Ticker(ticker_name)
    stats_ticker = pd.DataFrame(share.candles(date=begin_date, till_date=end_date))
    print(stats_ticker.head())


def get_currency():
    pass

def main():
    # ticker_candles('LKOH', '2024-04-10', '2024-04-11', '10m')
    # ticker_tradestats('LKOH', '2023-10-10', '2023-10-18')

    stocks = Market("shares/TQBR")
    all_stocks = pd.DataFrame(stocks.tickers())
    with open("tickers.txt", "w", encoding="utf-8") as file_tickers:
        print(f"Доступные акции на Мосбирже: {all_stocks.shape[0]}")
        print(f"Доступные акции на Мосбирже: {all_stocks.shape[0]}", file=file_tickers)
        list_tickers = all_stocks["SECID"].tolist()
        list_shortname = all_stocks["SHORTNAME"].tolist()
        for ticker, shortname in zip(list_tickers, list_shortname):
            print(f"{ticker} {shortname}")
            print(f"{ticker} {shortname}", file=file_tickers)
    print('---------------------')



if __name__ == '__main__':
    main()
