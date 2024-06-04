import React, {useEffect, useState} from "react";
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
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import {statisticsCardsData} from './statisticsCardsData.jsx'
import {StatisticsCard} from './StatisticsCard.jsx'
import {useMaterialTailwindController} from "../../context/index.jsx";
import DoughnutChartSelection from '../../modules/dashboard/components/DoughnutChartSelection'
import LineChart from '../../modules/dashboard/components/LineChart'
import {TickerTape} from '../../components/TickerTape.jsx'
import stockStore from "../../modules/stock/store/StockStore.jsx";
import {observer} from "mobx-react-lite"
import appStore from '../../stores/AppStore.jsx'
import investmentsStore from '../../stores/InvestmentsStore.jsx'

export const Home = observer(() => {

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, textColor } = controller;

  useEffect(() => {
    stockStore.getTickers()

    fetch(`http://127.0.0.1:8080/profile/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },body: JSON.stringify({
          username: appStore.username,
            password: ''
        })
    })  .then((response) => response.json())
        .then((json) => {
          const obj = JSON.parse(json)
          console.log(obj)
          investmentsStore.currentBalance = obj.balance
            investmentsStore.USD = obj.dollars
            investmentsStore.EUR = obj.euro
            investmentsStore.YAUN = obj.yuan
        })
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12">
        <TickerTape tickers={stockStore.tickers}/>
      </div>
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
                key={title}
                {...rest}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-black",
                })}
            />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <DoughnutChartSelection/>
      </div>
    </div>
  );
})
