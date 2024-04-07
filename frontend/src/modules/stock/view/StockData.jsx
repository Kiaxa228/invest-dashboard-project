import React from 'react';
import {observer} from "mobx-react-lite"
import AreaChart from '../components/AreaChart.jsx'
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
import { TypeChooser } from "react-stockcharts/src/lib/helper";
import {StockSearch} from "../../../components/StockSearch"
export const StockData = observer(() => {

    return (
        <div className="mt-6">
            <StockSearch/>
            <Card className="mt-5">
                <CardHeader variant="gradient" >
                    <Typography>

                    </Typography>

                </CardHeader>
                <CardBody>
                    <AreaChart data={[
                        {date: new Date('2010-01-04'),
                            close: 5743.25},
                        {date: new Date('2010-01-05'),
                            close: 5745.25}
                    ]} ratio={1} width={600}/>
                </CardBody>
            </Card>
        </div>

    )
})