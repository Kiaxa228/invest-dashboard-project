import {observable} from 'mobx'

export class AppStore {
    @observable serverURL = 'http://192.168.1.68:8080'
    @observable structureURL = 'http://localhost:5173'

}

const appStore = new AppStore()

export default appStore