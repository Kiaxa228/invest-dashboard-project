import {observable} from 'mobx'

export class AppStore {
    @observable serverURL = 'http://localhost:5000'


}

const appStore = new AppStore()

export default appStore