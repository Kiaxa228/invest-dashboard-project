import React, {useState} from 'react';
import {observer} from "mobx-react-lite"
import AreaChart from '../components/AreaChart.jsx'
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
import { TypeChooser } from "react-stockcharts/src/lib/helper";
import {StockSearch} from "../../../components/StockSearch"
import {bgThemeStyles} from "../../../styles/styles.jsx";
import { SiteFraming, Auth } from "@/layouts";
import stockStore from "../store/StockStore.jsx";

export const StockData = observer(() => {

    const [curCategory, setCurCategory] = useState('акций')

    const onCategoryClick = (name) => {
        setCurCategory(name)
    }

    return (
        <div>

                <div className="mt-6">
                    <StockSearch/>
                    <ButtonGroup color={"yellow"} className={" mt-5 opacity-85"}>
                        <Button onClick={() => onCategoryClick('акций')}>Акции</Button>
                        <Button onClick={() => onCategoryClick('валют')}>Валюта</Button>
                        <Button onClick={() => onCategoryClick('фондов')}>Фонды</Button>
                        <Button onClick={() => onCategoryClick('облигаций')}>Облигации</Button>
                    </ButtonGroup>

                    <div className="mt-3">
                        <TickersTable tickers={stockStore.tickers} category={curCategory}/>
                    </div>

                    <Card className="mt-5">
                        <CardBody className={bgThemeStyles.dark + " rounded-lg "}>
                            <AreaChart data={[
                                {
                                    date: new Date('2010-01-04'),
                                    close: 5743.25
                                },
                                {
                                    date: new Date('2010-01-05'),
                                    close: 5745.25
                                }
                            ]} ratio={1} width={600}/>
                        </CardBody>
                    </Card>
                </div>


        </div>
    )
})