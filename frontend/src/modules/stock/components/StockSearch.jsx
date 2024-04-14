import { Select, Option, Input } from "@material-tailwind/react";
import {useMaterialTailwindController} from "../../../context/index.jsx";
import {bgThemeStyles} from "../../../styles/styles.jsx";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import {useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import stockStore from "../store/StockStore.jsx";

export const StockSearch = observer(({tickers}) => {

    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav, textColor } = controller;
    const [inputValue, setInputValue] = useState('')
    const timerIdRef = useRef(null);

    const onInputChange = (event) => {

        stockStore.isLoading = true
        const { value } = event.target;

        setInputValue(value)

        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current)
        }

        timerIdRef.current = setTimeout(() => {
            stockStore.tickersFilterValues.TICKER_NAME = value
            stockStore.getTickers()
        }, 350)
    }

    return (
        <div className="w-full">
            <Card>
                <CardBody className={bgThemeStyles.dark + " rounded-lg"}>
                    <Input
                        className={"text-white "}
                        label={"Поиск"}
                        value={inputValue}
                        onChange={onInputChange}
                        type={"search"}
                        color={"yellow"}
                        labelProps={{
                            style: { color: "white" },
                        }}>
                    </Input>
                </CardBody>
            </Card>
        </div>
    );
})

