import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import {createRoot} from 'react-dom/client';
import Current from './components/current';
import TwelveHour from './components/twelveHours';
import Chart from './components/chart'
import Location from './call.mjs'
import * as data from './data.mjs'
import Loading from './components/loading';
import CustomError from './components/customError'
import { ContextProvider, StyleContext } from './components/context'


const App = ((props) => {

    const [isLoading, setLoading] = useState(true);
    const [currentData, setCurrent] = useState(null);
    const [chartData, setChart] = useState(null);
    const [twelveHourData, setTwelve] = useState(null);
    const [error, setError] = useState(null)
    const [resp, setResp] = useState(null)
    const style = useContext(StyleContext)

//**********************************************************************                    

    useEffect(() => {
        try {
            const fetchData = (async () => {
                let location = new Location()
                let response = await location.get()
                let final = await response.call()
                setResp(final)
            });
            fetchData();
        } catch (error) {
                
            setLoading(false)
            setError('Error Loading Data useEffect1')
            console.log(error)
        };
    }, []);
    
    useEffect(() => {
        try {
            const x = new data.ChartData(resp.hourly);
            x.create()                                                     //i was forgetting to create these
            const twelveHourData = new data.EveryTwelveHourData(resp.daily)
            twelveHourData.create()                                       //i was forgetting to create these
            let chartData = {
                chart: x.chart,
                time: x.time
            };
            setCurrent(new data.CurrentData(resp.hourly, resp.city, resp.state))
            setChart(chartData)
            setTwelve(twelveHourData.create())
            setLoading(false)
        } catch (error) {
            ('Error Loading Data')
            console.log(error)
        };
    }, [resp]);
    return (
        <div className='app' style={style.app}>
            {isLoading ? <Loading /> : false}
            {error ? <CustomError error={error} /> : false}
            {!isLoading && !error && currentData && chartData && twelveHourData ? (
                <>
                    <Current data={currentData} />
                    <Chart data={chartData} />
                    <TwelveHour data={twelveHourData} />
                </>
            ) : null}
        </div>
    );
    
});

//**********************************************************************                    

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </StrictMode>
);