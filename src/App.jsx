import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import React from "react";
import {Fragment, useContext, useEffect} from "react";
import {inject, Observer, Provider} from "mobx-react";
import { observer} from "mobx-react"
import {makeAutoObservable} from "mobx";
import investmentsStore from "@/stores/InvestmentsStore.jsx";

export const App = observer(() => {

        useEffect(() => {
            investmentsStore.init()
        })

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
                                    <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
                                </Fragment>
                            }
                        </Routes>
                    </Fragment>
                }

            </Fragment>
        );
})


