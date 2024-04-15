import React from 'react';
import ReactDOM from 'react-dom/client';
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";

IgrFinancialChartModule.register();

export default class FinancialChartStock extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            let newData = []

            for (let i = 0; i < this.props.data.length; i++) {
                let obj = this.props.data[i];

                obj.time = new Date(obj.time)

                newData.push(obj)
            }

            this.setState({data: newData})
        }
    }

    public render(): JSX.Element {
        return (
            <div className="container sample" >
                <div className="container" style={{height: 500}}>
                    <IgrFinancialChart
                        width="100%"
                        height="100%"
                        isToolbarVisible={false}
                        chartType="Candle"
                        chartTitle="S&P 500"
                        titleAlignment="Left"
                        titleLeftMargin="25"
                        titleTopMargin="10"
                        titleBottomMargin="10"
                        subtitle="CME - CME Delayed Price, Currency in USD"
                        subtitleAlignment="Left"
                        subtitleLeftMargin="25"
                        subtitleTopMargin="5"
                        subtitleBottomMargin="10"
                        yAxisLabelLocation="OutsideLeft"
                        yAxisMode="Numeric"
                        yAxisTitle="Financial Prices"
                        yAxisTitleLeftMargin="10"
                        yAxisTitleRightMargin="5"
                        yAxisLabelLeftMargin="0"
                        zoomSliderType="None"
                        dataSource={this.state.data}/>
                </div>
            </div>
        );
    }
}

