import React, { StrictMode, useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client';
import Current from './components/current';
import TwelveHour from './components/twelveHours';
import Chart from './components/chart'
import Location from './call.mjs'
import * as data from './data.mjs'
import Loading from './components/loading';
import Theme from './assets/Themes.mjs'
import * as util from './util.mjs'
const App = ((props) => {

    const [isLoading, setLoading] = useState(true)
    const [currentData, setCurrent] = useState(null)
    const [chartData, setChart] = useState(null)
    const [twelveHourData, setTwelve] = useState(null)
    const [error, setError] = useState(null)
    const [colorTheme, setTheme] = useState('MossyFernDark')
    const [mode, setMode] = useState('desktop')

    useEffect(() => {
        async function fetch() {
            try {
                const response = await (new Location()).get();
                await response.call();
                const chartData = new data.ChartData(response.hourly);
                let x = chartData.create()
                let chart = {
                    chart: x.chart,
                    time: x.time
                };
                const twelveHourData = new data.EveryTwelveHourData(response.daily)
                setCurrent(new data.CurrentData(response.hourly, response.city, response.state)),
                setChart(chart)
                setTwelve(twelveHourData.create())
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError('Error Loading Data')
            }
        }
        fetch();
    }, []);

    useEffect(()=>{
    const resize = (() => {
        let newMode = util.isMobile ? 'mobile' : 'desktop'
        let newTheme = util.isMobile ? 'MossyFernDark' : 'MossyFernLight'
        setTheme(newTheme),
            setMode(newMode);
    });
    resize();
            window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);
    
    try {
        let css = new Theme(colorTheme)['style']
        let fontColor = css['app']['color']

        
        return (
            <div className='app' style={css['app']}>
                {isLoading ? <Loading /> : null}
                {error ? <div>{error}</div> : null}
                {currentData && chartData && twelveHourData ? (
                    <>
                        <Current id='current' data={currentData} />
                        <Chart id='chart' color={fontColor} data={chartData} />
                        <TwelveHour id="twelveHour" color={fontColor} data={twelveHourData} />
                    </>
                ) : null}
            </div>
        );
    }
    catch (error) {
        console.log(error);
    };
});
//**********************************************************************

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
