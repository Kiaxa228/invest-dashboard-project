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
import { SketchPicker } from 'react-color';
import FinancialChartStock from '../components/FinancialChartStock'
import {observer} from "mobx-react-lite"
import {LoadingSpinner} from "../../../components/LoadingSpinner.jsx"
import stockStore from "../store/StockStore.jsx";
import {bgThemeStyles} from "../../../styles/styles.jsx";
import {useMaterialTailwindController} from "../../../context/index.jsx";
import getSymbolFromCurrency from "currency-symbol-map";
export const TickerData = (() => {

    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav, textColor } = controller;

    const [candles, setCandles] = useState({})
    const [lastPrice, setLastPrice] = useState(0)
    const [tickerData, setTickerData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [growthPerTimeFrame, setGrowthPerTimeFrame] = useState(0)
    const [chartColor, setChartColor]  = useState("#ffe600")

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
                setGrowthPerTimeFrame(JSON.parse(json[1]).growPerYearPercent)
                setTickerData(json[2])
                setIsLoading(false)
            })
    }, []);

    const onChartColorChange = (color) => {
        setChartColor(color.hex)
    }

    return (
        <div>
            {
               isLoading ? <LoadingSpinner isInTable={false}/> :  <div className="">
                   <Card className={"bg-gradient-to-br from-gray-500 to-gray-900 rounded-lg "}>
                       <CardBody className="flex justify-evenly">
                           <div className="flex flex-row gap-6">
                               <Avatar
                                   src={`https://invest-brands.cdn-tinkoff.ru/${tickerData.instrument.brand.logo_name.replace('.png', '')}x640.png`}
                                   alt={'avatar'} size="xl"/>
                               <div>
                                   <Typography color={textColor} variant={"h4"} className={"font-medium"}>
                                       {tickerData.instrument.name}
                                   </Typography>
                                   <Typography color={textColor} variant={"small"} className={"font-medium"}>
                                       {tickerData.instrument.ticker}
                                   </Typography>
                               </div>
                           </div>
                           <div className="flex flex-row gap-4 ">
                               <div className="flex flex-col">
                                   <Typography color={textColor} variant={"h5"} className={"font-light"}>
                                       Доходность за год
                                   </Typography>
                                   <Typography color={textColor} variant={"h3"} className={"font-bold"}>
                                       {growthPerTimeFrame.toFixed(2) } %
                                   </Typography>
                               </div>
                               <div className="flex flex-col">
                                   <Typography color={textColor} variant={"h5"} className={"font-light"}>
                                       Cтоимость
                                   </Typography>
                                   <Typography color={textColor} variant={"h3"} className={"font-bold"}>
                                        {lastPrice + getSymbolFromCurrency(tickerData.instrument.currency)}
                                   </Typography>
                               </div>
                           </div>
                       </CardBody>
                   </Card>
                   <div className="mt-5 flex justify-evenly">
                       <FinancialChartStock data={candles} chartColor={chartColor}/>
                       <div>
                           <SketchPicker
                               color={chartColor}
                               onChange={onChartColorChange}
                           />
                       </div>
                   </div>

               </div>
            }
        </div>
    )
})