import React, { StrictMode, useState } from 'react'
import {createRoot} from 'react-dom/client';
import Current from './components/current';
import TwelveHour from './components/twelveHours';
import ChartView from './components/chartView'
import Location from './call.mjs'
import * as data from './data.mjs'

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
            app: {
                'display': 'flex',
                'flexDirection': 'column',
                'justifyContent': 'center',
                'height': '100%',
                'width': '100%',
                'fontFamily': ['lato', 'Arial', 'Helvetica', 'sansSerif']
            },
            center: {
                'display': 'flex',
            },
            panel: {
                'display': 'flex',
                'width': '20%',
                'height': '100%'
            },
            main: {
                'display': 'flex',
                'alignItems': 'center',
                'flexDirection': 'column',
                'gap': '5em',
            }
        };
    };
    async componentDidMount() {
        try {
            const location = new Location();
            let response = await location.get();
            await response.call();
            let chartData = new data.ChartData(response.hourly);
            let current = new data.CurrentData(response.hourly)
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
                    <div>Loading...</div>
                )
            } else {
                const { currentData, twelveHourData, chartData } = this.state;
                const style = this.style;
                return (
                    <div style={style.app}>
                        <div style={style.center}>
                            <div style={style.panel} />
                            <main style={style.main}>
                                <Current id="current" data={currentData} />
                                <ChartView id='chart' data={chartData} />
                                <TwelveHour id="twelveHour" data={twelveHourData} />
                            </main>
                            <div style={style.panel} />
                        </div>
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