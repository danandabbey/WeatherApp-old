/**********************************************************************

A simple line chart for displaying the change in data over time.
Currently displays 12 hours of data.

things to do:
    
    *possibly add more data options

    *optimize its appearance for mobile use

**********************************************************************/

import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import { Line } from 'react-chartjs-2';
import { StyleContext, MobileContext } from './context';
import { dataContext } from '../App';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**********************************************************************

Buttons that control the chart view

**********************************************************************/

const ChartButtons = ((props) => {
    const style = useContext(StyleContext)
    return (
        <div style={style.chartBtnCon}>
            <button style={style.chartBtn} onClick={props.temperature}>Temperature</button>
            <button style={style.chartBtn} onClick={props.precipitation}>Precipitation</button >
            <button style={style.chartBtn} onClick={props.humidity}>Humidity</button>
        </div>
    );
});
//**********************************************************************

const LineChart = ((props) => {
    const isMobile = useContext(MobileContext);
    const style = useContext(StyleContext)
    let titleSize = isMobile ? 30 : 40
    let fontSize = isMobile ? 15 : 20
    const options = {
        responsive: true,
        layout: {
            autoPadding: true
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.title,
                font: {
                    size: titleSize
                },
                padding: 20,
                color: style.app.color
            }
        },
        scales: {
            x: {
                grid: {
                    color: style.app.color,
                    font: {
                        size: fontSize
                    }
                },
                ticks: {
                    color: style.app.color,
                    font: {
                        size: fontSize
                    }
                },
            },
            y: {
                grid: {
                    color: style.app.color,
                    font: {
                        size: fontSize
                    }
                },
                ticks: {
                    color: style.app.color,
                    font: {
                        size: fontSize
                    }
                },
            },
        },
        elements: {
            point: {
                backgroundColor: style.app.color,
            },
            line: {
                borderColor: style.app.color,
            },
        },
    };
    const data = {
        labels: props.time,
        datasets: [{
            label: 'Time',
            data: props.data,
            borderColor: style.app.color,
            tension: .5
        }]
    };    
    return (
        <Line style={style.chart} data={data} options={options} />
    )
});


//**********************************************************************

const Chart = ((props) => {
    const data = useContext(dataContext)
    const style = useContext(StyleContext)
    const [currentChart, setCurrentData] = useState({})
    const time = data.chart.time;
    const chart = data.chart.chart;

    const find = ((key) => {

        const charts = [
            { id: 1, title: 'Temperature', data: chart.temp },
            { id: 2, title: 'Chance of Precipitation', data: chart.precipitation },
            { id: 3, title: 'Humidity', data: chart.humidity }
        ];

        let object = charts.find((obj) => obj.id === key)
        return object.data;
    });
    const temperature = (() => setCurrentData(find(1)));
    const precipitation = (() => setCurrentData(find(2)));
    const humidity = (() => setCurrentData(find(3)));

    useEffect(() => {
        temperature();
    }, [data.chart]);

    return (
        <div style={style.chartCon}>
            <div style={style.media} className='media'>
                < LineChart time={time} title={currentChart.title} data={currentChart.data} />
                <ChartButtons temperature={temperature} precipitation={precipitation} humidity={humidity} />
            </div>
        </div>
    );
});

export default Chart;

