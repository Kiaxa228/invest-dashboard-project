import os
import sys
import pandas as pd
from backend.model.currencies_data import CurrenciesData
from backend.model.db_session import create_session, global_init

current_directory = os.path.dirname(__file__)
parent_directory = os.path.dirname(current_directory)
project_directory = os.path.dirname(parent_directory)

sys.path.append(project_directory)

csv_file_path = 'D:\\pythonProjects\\invest-dashboard\\data\\CurrenciesData.csv'
df = pd.read_csv(csv_file_path)

df = df[['name', 'figi', 'ticker', 'currency', 'uid', 'brand']]

global_init('postgres')
session = create_session()

for index, row in df.iterrows():
    cur_data = CurrenciesData(name=row['name'], figi=row['figi'], ticker=row['ticker'], currency=row['currency'],
                              uid=row['uid'], logoName=row['brand'])

    session.add(cur_data)
    session.commit()

    print(cur_data)

session.close()

