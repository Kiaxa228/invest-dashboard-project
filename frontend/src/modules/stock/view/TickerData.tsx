import React, {useEffect, useState} from 'react';
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
    Button,
    ButtonGroup
} from "@material-tailwind/react";
import FinancialChartStock from '../components/FinancialChartStock'
import {observer} from "mobx-react-lite"
import {LoadingSpinner} from "../../../components/LoadingSpinner.jsx"
import stockStore from "../store/StockStore.jsx";
export const TickerData = (() => {

    const [candles, setCandles] = useState({})
    const [lastPrice, setLastPrice] = useState(0)
    const [tickerData, setTickerData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const category = window.location.pathname.slice(window.location.pathname.indexOf('/', 2) + 1, window.location.pathname.lastIndexOf('/'))
        const tickerName = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1)


        const params = {
            'ticker': tickerName,
            'CATEGORY': stockStore.catalogCategory[category]
        }

        stockStore.getDataByTickerName(params)
            .then((response) => response.json())
            .then((json) => {
                setLastPrice(JSON.parse(json[0]).prices[0])
                setCandles(JSON.parse(json[1]).candles)
                setTickerData(json[2])
                setIsLoading(false)
            })
    }, []);

    return (
        <div>
            {
               isLoading ? <LoadingSpinner isInTable={false}/> :  <div className="">
                   <Card>
                       <CardBody className={`bg-gradient-to-br from-yellow-600 to-yellow-400`}>
                           <Avatar
                               src={`https://invest-brands.cdn-tinkoff.ru/${tickerData.instrument.brand.logo_name.replace('.png', '')}x640.png`}
                               alt={'avatar'} size="xl"/>
                       </CardBody>
                   </Card>
                   <FinancialChartStock data={candles}/>
               </div>
            }
        </div>
    )
})