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

const TABLE_HEAD = ["Название", "Цена", "За день", "За месяц", "График"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },
];

export const TickersTable =  observer(({category, tickers}) => {

    const [tickersCandles, setTickersCandles] = useState([])
    const [tickersLastPrices, setTickersLastPrices] = useState([0] * 5000)

    useEffect(() => {
        getTickersLastPrices()

        let newTickersCandles = [];

        for (const ticker of tickers) {
            let curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() - 1);

            let params = {
                "ticker": ticker,
                "dateFrom": curDate.getTime(),
            };

            stockStore.getTickerCandles(params)
                .then((response) => response.json())
                .then((json) => {
                    newTickersCandles.push(json)
                })
        }

        setTickersCandles(newTickersCandles);
    }, [tickers]);

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
                    {tickers.map(
                        (el, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    src={`https://invest-brands.cdn-tinkoff.ru/${el.logoName.replace('.png', '')}x160.png`}
                                                    alt={'avatar'} size="md"/>
                                                <div>
                                                    <Typography variant="h6" color={'black'}>{el.name}</Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">{el.ticker}</Typography>
                                                </div>
                                            </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {tickersLastPrices[index]}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={null ? "online" : "offline"}
                                                color={null ? "green" : "blue-gray"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {null}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
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