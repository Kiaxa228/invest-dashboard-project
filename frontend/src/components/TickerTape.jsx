import React, {useEffect, useState} from 'react'
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
import {
    ChevronUpIcon,
    ChevronDownIcon
} from "@heroicons/react/24/solid";
import stockStore from "../modules/stock/store/StockStore.jsx";
import {LoadingSpinner} from '../components/LoadingSpinner.jsx'
export const TickerTape = ({tickers}) => {

    const [tickerTapeData, setTickerTapeData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect( () => {
        if (tickers.length > 0) {
            getTickerTapeData()
        }
    }, [tickers])

    const getTickerTapeData = async () => {
        const tickersCandles = await Promise.all(tickers.map(async (ticker) => {
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

        stockStore.getLastPrice({'figi': tickers.map((el) => el.figi)})
            .then((response) => response.json())
            .then((json) => {
                const obj = JSON.parse(json)

                let newTickerTapeData = []

                for(let i = 0; i < tickers.length; i++) {
                    newTickerTapeData.push({
                        ticker: tickers[i],
                        lastPrice: obj.prices[i],
                        growPerTimeFrame: tickersCandles[i].growPerYear
                    })
                }

                setTickerTapeData(newTickerTapeData)
                setIsLoading(false)
            })
    }

    return (
        <div>
            {
               isLoading ? <LoadingSpinner isInTable={false}/> : <Ticker
                    animationSpeed={40}
                    bg={"#2D2D2D"}
                    text={<TickerCard data={tickerTapeData}/>}/>
            }
        </div>


    )
}

const TickerCard = ({data}) => {

    const [content, setContent] = useState([])

    useEffect(() => {
        const newData = data.map((el) => {
            return <div className="grid grid-cols-[35px_350px] gap-2">
                <div>
                    <Avatar
                        src={`https://invest-brands.cdn-tinkoff.ru/${el.ticker.logoName.replace('.png', '')}x160.png`}
                        alt={'avatar'} size="sm"/>
                </div>
                <div className="flex flex-row justify-evenly mt-1">
                    <div className="">
                        <Typography>
                            {el.ticker.ticker}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography>
                            {el.lastPrice}
                        </Typography>
                    </div>
                    <div className="">
                        {
                            el.growPerTimeFrame > 0 ?
                                <Typography
                                    color={"green"}>
                                {el.growPerTimeFrame.toFixed(2)}
                            </Typography> :  <Typography color="red">
                                {el.growPerTimeFrame.toFixed(2)}
                            </Typography>
                        }
                    </div>
                    <span className="text-gray-500">|</span>
                </div>


            </div>
        })
        setContent(newData)

    }, [data])

    return <div className="flex flex-row">
        {content}
    </div>

}