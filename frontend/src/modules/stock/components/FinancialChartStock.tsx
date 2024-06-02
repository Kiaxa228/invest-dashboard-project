import React from 'react';
import ReactDOM from 'react-dom/client';
import { IgrFinancialChart, IgrFinancialPriceSeries } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";

IgrFinancialChartModule.register();

export default class FinancialChartStock extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            brushes : ["#ffe600"],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let newData = []

            for (let i = 0; i < this.props.data.length; i++) {
                let obj = this.props.data[i];

                obj.time = new Date(obj.time)

                newData.push(obj)
            }

            this.setState({brushes: [this.props.chartColor]})
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
                        isToolbarVisible={true}
                        chartType="Line"
                        titleAlignment="Left"
                        titleLeftMargin="25"
                        titleTopMargin="10"
                        titleBottomMargin="10"
                        yAxisLabelLocation="OutsideLeft"
                        areaFillOpacity="0.2"
                        yAxisMode="Numeric"
                        zoomSliderType="Auto"
                        brushes={this.state.brushes}
                        dataSource={this.state.data}>
                    </IgrFinancialChart>
                </div>
            </div>
        );
    }
}

