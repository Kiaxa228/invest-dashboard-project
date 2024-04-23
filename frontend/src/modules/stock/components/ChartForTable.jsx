import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite"
import Chart from "react-apexcharts";
import ReactDOMServer from 'react-dom/server';
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
export const ChartForTable = (({chartData, currency, color}) => {

    const [seriesData, setSeriesData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])

    useEffect(() => {
         let newSeriesData = chartData.map((el) => {
             return el.close
        })

        let newCategoriesData = chartData.map((el) => {
            const date = new Date(el.time);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // добавляем 1, так как месяцы в JS начинаются с 0
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            return formattedDate
        })

        setCategoriesData(newCategoriesData)
        setSeriesData(newSeriesData)
    },[chartData])

    const chartConfig = {
        type: "line",
        height: 105,
        width: 200,
        series: [
            {
                name: `Price ${currency}`,
                data: seriesData,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'green',
                        shadeIntensity: 0.3,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 0.5,
                        stops: [0, 50, 100]
                    },
                },
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    show: false,
                },
                categories: categoriesData,
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 100],
                    colorStops: [
                        {
                            offset: 0,
                            color: color,
                            opacity: 1,
                        },
                    ],
                },
            },
            tooltip: {
                enabled: true,
                theme: "dark",
                x: {
                    show: false
                }
            },
        },
    };

    return (
        <div className='w-1/2 h-full'>
            <Chart {...chartConfig} />
        </div>
    )
})