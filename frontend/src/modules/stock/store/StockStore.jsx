import {action, observable} from 'mobx'
import appStore from "@/stores/AppStore.jsx";
import {makeAutoObservable} from "mobx";
import {json} from "react-router-dom";

export class StockStore {
    tickers = []
    restUrl = appStore.serverURL + "/stock"
    isLoading = false
    error = ''
    isInitialized = false

    tickersFilterValues = {
        "ITEMS_ON_PAGE": 15,
        "PAGE": 1
    }

    constructor() {
        makeAutoObservable(this)
    }

    @action
    init() {
        this.isLoading = true

        this.getTickers()
    }

    @action
    getTickers() {
        fetch(`${this.restUrl}/get-tickers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.tickersFilterValues)
        })
            .then((response) => response.json())
            .then((json) => this.onLoadTickers(json))
            .catch((err) => this.onError(err))
    }

    getTickerCandles = (params) => {
        return fetch(`${this.restUrl}/get-tickerCandles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
    }

    @action.bound
    onLoadTickers(json) {
        this.tickers = JSON.parse(json)
        this.isLoading = false
        this.isInitialized = true
    }

    @action.bound
    onError(err) {
        this.isLoading = false;
        this.error = "Ошибка при инициализации модуля: " + err.message;
    }
}

const stockStore = new StockStore()

export default stockStore