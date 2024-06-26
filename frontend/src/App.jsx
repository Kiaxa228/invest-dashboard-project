import { Routes, Route, Navigate, BrowserRouter  } from "react-router-dom";
import { Auth } from "@/layouts";
import React from "react";
import {Fragment, useContext, useEffect} from "react";
import {Observer} from "mobx-react-lite";
import { observer} from "mobx-react-lite"
import {makeAutoObservable} from "mobx";
import investmentsStore from "@/stores/InvestmentsStore.jsx";
import {StockData} from "./modules/stock/view/StockData.jsx";
import stockStore from "./modules/stock/store/StockStore.jsx";
import appStore from "./stores/AppStore.jsx";
import {Stock} from "./modules/stock/Stock.jsx"
import SignIn from"./pages/auth/sign-in.jsx"
import SignUp from"./pages/auth/sign-up.jsx"
import SiteFraming from "./layouts/SiteFraming.jsx";
import {Home} from  "@/pages/dashboard"
import {TickerData} from "./modules/stock/view/TickerData.tsx"
import {AuthorizedPage} from './components/AuthorizedPage.jsx'

export const App = observer(() => {

        useEffect(() => {
            investmentsStore.init()
        },[investmentsStore])

        return (
            <BrowserRouter>>
                {
                    <Fragment>
                        {
                            !!investmentsStore.error && <div className="m-20">
                                <h1>Ошибка запуска модуля</h1>
                                <p>{investmentsStore.error}</p>
                            </div>
                        }

                            <Routes>
                                {
                                    !investmentsStore.isLoading && investmentsStore.isInitialized &&
                                    <Fragment>
                                            <Route path={`/home`} element={
                                                <AuthorizedPage>
                                                    <SiteFraming>
                                                        <Home/>
                                                    </SiteFraming>
                                                </AuthorizedPage>
                                            }/>
                                            <Route path={`/auth/*`} element={<Auth/>}/>
                                            <Route path="/stock" element={
                                                <AuthorizedPage>
                                                    <SiteFraming>
                                                        <Stock/>
                                                    </SiteFraming>
                                                </AuthorizedPage>
                                            }/>
                                            <Route path="/stock/*" element={
                                                <AuthorizedPage>
                                                    <SiteFraming>
                                                        <TickerData/>
                                                     </SiteFraming>
                                                </AuthorizedPage>
                                            }/>
                                        <Route path="/sign-in" element={<SignIn/>}/>
                                        <Route path="/sign-up" element={<SignUp/>}/>
                                    </Fragment>
                                }
                            </Routes>
                    </Fragment>
                }

            </BrowserRouter>
                )
})


