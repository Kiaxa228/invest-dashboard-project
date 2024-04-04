import {action, observable} from 'mobx'
import appStore from "@/stores/AppStore.jsx";

export class InvestmentsStore {
    @observable balance = {
        currentBalance: 0,
        investments: 0,
        USD: 0,
        EUR: 0
    }
    @observable restUrl = appStore.serverURL + "/api/investments"
    @observable isLoading = false
    @observable error = ''
    @observable isInitialized = false

    @action
    init() {
        this.isLoading = true

        this.getInvestmentsBalance()
    }

    @action
    getInvestmentsBalance() {
        fetch(`${this.restUrl}/getBalance`)
            .then((json) => this.onLoadInvestmentsBalance(json))
            .catch((err) => this.onError(err))
    }

    @action.bound
    onLoadInvestmentsBalance(json) {
        this.balance = json
        this.isLoading = false
        this.isInitialized = true
    }

    @action.bound
    onError(err) {
        this.isLoading = false;
        this.error = "Ошибка при инициализации модуля: " + err.message;
        console.log(err)
    }
}

const investmentsStore = new InvestmentsStore()

export default investmentsStore