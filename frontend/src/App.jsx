import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import React from "react";
import {Fragment, useContext, useEffect} from "react";
import {Observer} from "mobx-react-lite";
import { observer} from "mobx-react-lite"
import {makeAutoObservable} from "mobx";
import investmentsStore from "@/stores/InvestmentsStore.jsx";
import {StockData} from "./modules/stock/view/StockData.jsx";

export const App = observer(() => {

        useEffect(() => {
            investmentsStore.init()
        },[investmentsStore])

        return (
                    <Fragment>
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
                                            <Route path="/dashboard/*" element={<Dashboard/>}/>
                                            <Route path="/auth/*" element={<Auth/>}/>
                                            <Route path="/stock/*" element={<StockData/>}/>
                                            <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
                                        </Fragment>
                                    }
                                </Routes>
                            </Fragment>
                        }

                    </Fragment>
                )
})


