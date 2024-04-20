import React, {useEffect} from 'react'
import {Ticker} from 'react-ticker-tape'
import {bgThemeStyles} from "../styles/styles.jsx";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import stockStore from "../modules/stock/store/StockStore.jsx";
export const TickerTape = () => (

    useEffect(() => {
        stockStore.tickers
    })

    <Ticker
        animationSpeed={40}
        bg={"#2D2D2D"}
        text={<TickerCard />}/>
)

const TickerCard = () => {
    return <div className="mt-2">
        dfsdfsdfs
        <span className="mx-2 text-gray-500" >|</span>
    </div>
}