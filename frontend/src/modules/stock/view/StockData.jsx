import React, {useState} from 'react';
import {observer} from "mobx-react-lite"

import {TickersTable} from '../components/TickersTable.jsx'
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

import {StockSearch} from "../../../components/StockSearch"
import {bgThemeStyles} from "../../../styles/styles.jsx";
import { SiteFraming, Auth } from "@/layouts";
import stockStore from "../store/StockStore.jsx";

export const StockData = observer(() => {

    const [curCategory, setCurCategory] = useState('акций')

    const onCategoryClick = (name, category) => {
        stockStore.tickersFilterValues.CATEGORY = category
        setCurCategory(name)
        stockStore.getTickers()
    }

    return (
        <div>

                <div className="mt-6">
                    <StockSearch tickers={stockStore.tickers}/>
                    <ButtonGroup color={"yellow"} className={" mt-5 opacity-85"}>
                        <Button onClick={() => onCategoryClick('акций', 0)}>Акции</Button>
                        <Button onClick={() => onCategoryClick('валют', 1)}>Валюта</Button>
                        <Button onClick={() => onCategoryClick('фондов', 2)}>Фонды</Button>
                        <Button onClick={() => onCategoryClick('облигаций', 3)}>Облигации</Button>
                    </ButtonGroup>

                    <div className="mt-3">
                        <TickersTable tickers={stockStore.tickers} category={curCategory}/>
                    </div>

                    <Card className="mt-5">
                        <CardBody className={bgThemeStyles.dark + " rounded-lg "}>

                        </CardBody>
                    </Card>
                </div>


        </div>
    )
})