from flask import Flask
from moexalgo import Ticker
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/getData')
def run():
    sber = Ticker('SBER')

    data = pd.DataFrame(sber.candles(date='2024-03-31', till_date='2024-04-01', period='1m'))
    return data.to_json()

if __name__ == "__main__":
    app.run()