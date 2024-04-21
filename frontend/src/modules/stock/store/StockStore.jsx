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
        "PAGE": 1,
        "LAST_PAGE_NUMBER": 1,
        "TICKER_NAME": "",
        "CATEGORY": 0
    }

    catalogCategory = {
        'share': 0,
        'currency': 1,
        'fund': 2,
        'bond': 3
    }

    constructor() {
        makeAutoObservable(this)
    }

    @action
    init() {
        this.isLoading = true

        this.getDefaultData()
    }

    @action
    getDefaultData() {
        this.isLoading = true

        fetch(`${this.restUrl}/get-tickers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.tickersFilterValues)
        })
            .then((response) => response.json())
            .then((json) => {
                const obj = JSON.parse(json)

                this.tickers = obj.list

            })
            .catch((err) => this.onError(err))
    }

    @action
    getTickers() {
        this.isLoading = true
        fetch(`${this.restUrl}/get-tickers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.tickersFilterValues)
        })
            .then((response) => response.json())
            .then((json) => this.onLoadTickers(JSON.parse(json)))
            .catch((err) => this.onError(err))
    }

    getTickerCandles = (params) => {
        this.isLoading = true
        return fetch(`${this.restUrl}/get-tickerCandles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
    }

    getDataByTickerName = (params) => {
        this.isLoading = true
        return fetch(`${this.restUrl}/get-dataByTickerName`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
    }

    getLastPrice = (params) => {
        this.isLoading = true
        return fetch(`${this.restUrl}/get-lastTickerPrice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
    }

    @action.bound
    onLoadTickers(json) {
        this.tickers = json.list
        this.tickersFilterValues.LAST_PAGE_NUMBER = json.last_page_number
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