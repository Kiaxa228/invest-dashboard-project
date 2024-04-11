import {observable} from 'mobx'

export class AppStore {
    @observable serverURL = 'http://127.0.0.1:8080'
    @observable structureURL = 'http://localhost:5173'

}

const appStore = new AppStore()

export default appStore