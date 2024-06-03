import os
import sys
import pandas as pd
from backend.model.currencies_data import CurrenciesData
from backend.model.db_session import create_session, global_init
from backend.model.tickers_data import TickersData

current_directory = os.path.dirname(__file__)
parent_directory = os.path.dirname(current_directory)
project_directory = os.path.dirname(parent_directory)

sys.path.append(project_directory)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df = pd.read_csv(os.path.join(BASE_DIR, 'Files', '../data/CurrenciesData.csv'))

df3 = pd.read_csv(os.path.join(BASE_DIR, 'Files', '../data/currency.csv'))
df1 = df[['name', 'figi', 'ticker', 'currency', 'uid', 'brand']]

global_init()
session = create_session()

for index, row in df1.iterrows():
    cur_data = CurrenciesData(name=row['name'], figi=row['figi'], ticker=row['ticker'], currency=row['currency'],
                              uid=row['uid'], logoName=row['brand'], type='Currency',
                              info=df3.iloc[index]['description'])

    session.add(cur_data)
    session.commit()

df2 = pd.read_csv(os.path.join(BASE_DIR, 'Files', '../data/TickersData.csv'))
df2 = df2[['name', 'figi', 'ticker', 'currency', 'uid', 'brand']]

for index, row in df2.iterrows():
    tick_data = TickersData(name=row['name'], figi=row['figi'], ticker=row['ticker'], currency=row['currency'],
                            uid=row['uid'], logoName=row['brand'], type='Ticker')

    session.add(tick_data)
    session.commit()


session.close()
