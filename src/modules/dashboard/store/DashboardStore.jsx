import {observable} from 'mobx'

export class DashboardStore {
    @observable balance

}

const dashboardStore = new DashboardStore()

export default dashboardStore