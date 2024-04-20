import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import CategorySelect from "./CategorySelect.jsx";
import {observer} from "mobx-react-lite"
import {useCallback, useEffect, useMemo, useState} from "react";
import stockStore from "../store/StockStore.jsx";
import {LoadingSpinner} from "../../../components/LoadingSpinner.jsx"
import getSymbolFromCurrency from 'currency-symbol-map'
import {ChartForTable} from "./ChartForTable.jsx";
import appStore from "../../../stores/AppStore.jsx";


const TABLE_HEAD = ["Название", "Цена", "За день", "За год", "График"];


export const TickersTable =  observer(({category, tickers}) => {

    const convertToEng = {
        'акций': 'share',
        'валют': 'currency',
    }

    const [tickersCandles, setTickersCandles] = useState(Array(5000).fill({
        candles: [],
        growPerDayAmount: 0,
        growPerDayPercent: 0,
        growPerYear: 0,
        growPerYearPercent: 0
    }))
    const [tickersLastPrices, setTickersLastPrices] = useState([0] * 5000)

    useEffect(() => {
        if (tickers.length > 0) {
            getTickersLastPrices()
            getTickersCandles()
        } else {
            stockStore.isLoading = false
        }
    }, [tickers]);

    const getTickersCandles = async () => {
        stockStore.isLoading = true

        const tickersCandles = await Promise.all(tickers.map(async(ticker) => {
            let params = {
                "uid": ticker.uid,
                "timeType": 'y',
                "timeAmount": 1,
                "interval": 5
            };

            const response = await stockStore.getTickerCandles(params)

            const json = await response.json()

            const obj = JSON.parse(json)

            return obj
        }))


        setTickersCandles(tickersCandles)

        stockStore.isLoading = false
    }

    const getTickersLastPrices = () => {
        stockStore.getLastPrice({'figi': tickers.map((el) => el.figi)})
            .then((response) => response.json())
            .then((json) => {
                const obj = JSON.parse(json)
                setTickersLastPrices(obj.prices)
            })
    }

    const onNextPageClick = () => {
        if (stockStore.tickersFilterValues.PAGE === stockStore.tickersFilterValues.LAST_PAGE_NUMBER) {
            return
        }
        stockStore.tickersFilterValues.PAGE += 1
        stockStore.getTickers()
    }

    const onPrevPageClick = () => {
        if (stockStore.tickersFilterValues.PAGE === 1) {
            return
        }
        stockStore.tickersFilterValues.PAGE -= 1
        stockStore.getTickers()
    }

    const onTableRowClick = (index) => {
        document.location.href = appStore.structureURL + `/stock/${convertToEng[category]}/${tickers[index].ticker}`
    }

    const getChipsForGrowth = (firstValue, secondValue, currency) => {
        firstValue = firstValue.toFixed(2)
        secondValue = secondValue.toFixed(2)
        let color = ""
        if (firstValue > 0) {
            color = "green"
            firstValue = '+' + firstValue
            secondValue = '+' + secondValue
        } else if (firstValue < 0) {
            color = "red"

        }
        return <div className="w-max flex flex-col gap-2">
            <Chip
                value={firstValue + ' ' + currency}
                color={color}
                variant={"ghost"}/>
            <Chip
                value={secondValue + " %"}
                color={color}
                variant={"ghost"}/>
        </div>
    }
    return (
        <Card className="h-full w-full">
            <div className="ml-5 pt-5 rounded-none ">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            {"Каталог " + category}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 md:flex-row">
                    <CategorySelect label={"Валюта"}/>
                    <CategorySelect label={"Биржа"}/>
                    <CategorySelect label={"Страна"}/>
                    <CategorySelect label={"Отрасль"}/>
                </div>
            </div>
            <CardBody className="overflow-hidden px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={head}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {head}{" "}
                                    {index !== TABLE_HEAD.length - 1 && (
                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                    )}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stockStore.isLoading || !tickers ? <LoadingSpinner isInTable={true}/> : tickers.map(
                        (el, index) => {
                            const isLast = index === 4;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index} className="hover:bg-blue-gray-50" onClick={() => onTableRowClick(index)}>
                                    <td className={classes}>
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    src={`https://invest-brands.cdn-tinkoff.ru/${el.logoName.replace('.png', '')}x160.png`}
                                                    alt={'avatar'} size="md"/>
                                                <div>
                                                    <Typography variant="h6" color={'black'}>{el.name}</Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">{el.ticker}</Typography>
                                                </div>
                                                <div>
                                
                                                    <IconButton 
                                                         ripple={true} 
                                                         variant="text"
                                                         color="blue"
                                                         title="В избранное">
                                                            <i className="far fa-star"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="h6"
                                                color="blue-gray"
                                            >
                                                {tickersLastPrices[index] + ' ' + getSymbolFromCurrency(el.currency)}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                            {tickersCandles[index].growPerDayAmount !== undefined && tickersCandles[index].growPerDayPercent !== undefined ? getChipsForGrowth(tickersCandles[index].growPerDayAmount, tickersCandles[index].growPerDayPercent, getSymbolFromCurrency(el.currency)) : null}
                                    </td>
                                    <td className={classes}>
                                        {tickersCandles[index].growPerYear !== undefined && tickersCandles[index].growPerYearPercent !== undefined ? getChipsForGrowth(tickersCandles[index].growPerYear, tickersCandles[index].growPerYearPercent, getSymbolFromCurrency(el.currency)) : null}
                                    </td>
                                    <td className={classes + " w-1/6 h-1/6"}>
                                        <ChartForTable chartData={tickersCandles[index].candles}
                                                       currency={getSymbolFromCurrency(el.currency)}
                                                       color={tickersCandles[index].growPerYear > 0 ? "#28a745" : "#dc3545"}/>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" onClick={onPrevPageClick}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" onClick={onNextPageClick}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
})