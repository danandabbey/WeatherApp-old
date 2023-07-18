import React, { StrictMode, useState } from 'react'
import {createRoot} from 'react-dom/client';
import Current from './components/current';
import TwelveHour from './components/twelveHours';
import Chart from './components/chart'
import Location from './call.mjs'
import * as data from './data.mjs'
import Loading from './components/loading';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            currentData: null,
            chartData: null,
            twelveHourData: null
        };
        this.style = {
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center',
            'alignItems': 'center',
            'height': '100%',
            'width': '100%',
            'fontFamily': ['lato', 'Arial', 'Helvetica', 'sansSerif']
        };
    };
    async componentDidMount() {
        try {
            const location = new Location();
            let response = await location.get();
            await response.call();
            let chartData = new data.ChartData(response.hourly);
            let current = new data.CurrentData(response.hourly,response.city,response.state)
            let twelveHourData = new data.EveryTwelveHourData(response.daily)
            let chart = chartData.create()
            let twelve = twelveHourData.create()
            this.setState({
                currentData:current,
                chartData:chart,
                twelveHourData:twelve,
                isLoading: false

            });
        } catch (error) { console.log(error) };
    };
    render() {
        try {
            const {isLoading} =this.state
            if (isLoading) {
                return (
                    <Loading/>
                )
            } else {
                const { currentData, twelveHourData, chartData } = this.state;
                const style = this.style;
                return (
                    <div style={style.style}>
                        <Current id="current" data={currentData} />
                        <Chart id='chart' data={chartData} />
                        <TwelveHour id="twelveHour" data={twelveHourData} />
                    </div>
                );
            }
        } catch (error) { console.log(error) };
    };
};

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);