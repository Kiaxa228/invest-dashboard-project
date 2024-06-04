import appStore from '../stores/AppStore.jsx'
import {Fragment, useContext, useEffect} from "react";

export const AuthorizedPage = ({children}) => {

    return (<div>
        {appStore.isAuthorized ? children : 'Not logged in'}
    </div>)
}