import React from 'react';
import ReactDOM from 'react-dom/client';

import { IgrCategoryChartModule } from "igniteui-react-charts";
import { IgrCategoryChart } from "igniteui-react-charts";

const mods: any[] = [
    IgrCategoryChartModule
];
mods.forEach((m) => m.register());


export class CountryRenewableElectricityItem {
    public constructor(init: Partial<CountryRenewableElectricityItem>) {
        Object.assign(this, init);
    }

    public year: string;
    public europe: number;
    public china: number;
    public america: number;

}
export default class LineChart extends React.Component<any, any> {
    private chart: IgrCategoryChart
    private data =[
        new CountryRenewableElectricityItem(
            {
                year: `2009`,
                europe: 34,
                china: 21,
                america: 19
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2010`,
                europe: 43,
                china: 26,
                america: 24
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2011`,
                europe: 66,
                china: 29,
                america: 28
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2012`,
                europe: 69,
                china: 32,
                america: 26
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2013`,
                europe: 58,
                china: 47,
                america: 38
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2014`,
                europe: 40,
                china: 46,
                america: 31
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2015`,
                europe: 78,
                china: 50,
                america: 19
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2016`,
                europe: 13,
                china: 90,
                america: 52
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2017`,
                europe: 78,
                china: 132,
                america: 50
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2018`,
                europe: 40,
                china: 134,
                america: 34
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2018`,
                europe: 40,
                china: 134,
                america: 34
            }),
        new CountryRenewableElectricityItem(
            {
                year: `2019`,
                europe: 80,
                china: 96,
                america: 38
            }),
    ]
    private chartRef(r: IgrCategoryChart) {
        this.chart = r;
        this.setState({});
    }

    constructor(props: any) {
        super(props);

        this.chartRef = this.chartRef.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">

                <div className="legend-title">
                    Renewable Electricity Generated
                </div>

                <div className="container fill" style={{height: 300, width: 300}}>
                    <IgrCategoryChart
                        ref={this.chartRef}
                        chartType="Line"
                        isHorizontalZoomEnabled="false"
                        isVerticalZoomEnabled="false"
                        dataSource={this.data}
                        includedProperties={["year", "europe"]}
                        yAxisTitle="TWh"
                        yAxisTitleLeftMargin="10"
                        yAxisTitleRightMargin="5"
                        yAxisLabelLeftMargin="0"
                        computedPlotAreaMarginMode="Series">
                    </IgrCategoryChart>
                </div>
            </div>
        );
    }

}
