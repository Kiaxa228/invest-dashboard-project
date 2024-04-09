import React, {useEffect, Fragment } from 'react';
import {observer} from "mobx-react-lite"
import stockStore from "./store/StockStore.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import {StockData} from "./view/StockData.jsx";
export const Stock = observer(() => {

    useEffect(() => {
        stockStore.init()
    }, [stockStore])

    return (
        <Fragment>
            {
                !!stockStore.error && <div className="m-20">
                    <h1>Ошибка запуска модуля биржы</h1>
                    <p>{stockStore.error}</p>
                </div>
            }
            {
                !stockStore.isLoading && stockStore.isInitialized &&
                <StockData/>
            }
        </Fragment>
)
})