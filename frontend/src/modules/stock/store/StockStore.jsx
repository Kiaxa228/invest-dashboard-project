import {action, observable} from 'mobx'
import appStore from "@/stores/AppStore.jsx";
import {makeAutoObservable} from "mobx";

export class StockStore {
    tickers = []
    restUrl = appStore.serverURL + "/stock"
    isLoading = false
    error = ''
    isInitialized = false

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
        fetch(`${this.restUrl}/get-tickers`)
            .then((json) => this.onLoadTickers(json))
            .catch((err) => this.onError(err))
    }

    @action.bound
    onLoadTickers(json) {
        this.tickers = json
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