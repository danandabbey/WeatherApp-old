/**********************************************************************

A simple line chart for displaying the change in data over time.
Currently displays 12 hours of data.

things to do:

    *figure out how to change color of chart data and 'constructor' lines.
    
    *possibly add more data options

    *optimize its appearance for mobile use

**********************************************************************/
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import * as util from '../util.mjs'

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


/**********************************************************************

Buttons that control the chart view

**********************************************************************/

const Buttons = ((props) => {
    
    let num = util.isMobile ? 20 : 24;
    let n = util.isMobile ? '1em' : '1.5em'
    const color = props.color

    const style = ((x) => {
        let list = [
            {
                class: 'button',
                style: {
                    'fontSize': num,
                    'color': color
                }
            },
            {
                class: 'con',
                style: {
                    'gap': n
                }
            }
        ];
        let css = list.find(((obj) => obj.class === x));
        return css.style;
    });


    return (
        <div className={'btnCon'} style={style('con')}>
        <button style={style('button')} onClick={props.temperature}>Temperature</button>
        <button style={style('button')} onClick={props.precipitation}>Precipitation</button >
        <button style={style('button')} onClick={props.humidity}>Humidity</button>
    </div>
    )
});

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

Line chart

**********************************************************************/

const LineChart = ((props) => {

    let num = util.isMobile ? 15 : 30;
    const title = props.title
    const chartData = props.chartData
    const time = props.time
    const color = props.color
    

    const style = ((x) => {
        let list = [
            {
                class: 'chart',
                style: {
                    'borderTop': `solid ${color} .1em`,
                    'borderBottom': `solid ${color} .1em`
                }
            }
        ]
        let css = list.find(((obj) => obj.class === x));
        return css.style;
    });

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
                text: title,
                font: {
                    size: num
                },
                padding: 20,
                color: color
            }
        },
        scales: {
            x: {
                grid: {
                    color: color,
                },
                ticks: {
                    color: color,
                },
            },
            y: {
                grid: {
                    color: color,
                },
                ticks: {
                    color: color,
                },
            },
        },
        elements: {
            point: {
                backgroundColor: color, 
            },
            line: {
                borderColor: color, 
            },
        },
    };
    const data = {
        labels: time,
        datasets: [{
            label: 'Time',
            data: chartData,
            borderColor: color,
            tension: .5
        }]
    };
    
    return (
        <Line style={style('chart')} data={data} options={options} />
    )
});


/**********************************************************************

The thing that putts it all together.

**********************************************************************/


const Chart = ((props) => {
    console.log(props)
    const [currentChart, setChart] = useState({})
    const charts = [
        { title: 'Temperature', data: props.data.chart.temp },
        { title: 'Chance of Precipitation', data: props.data.chart.precipitation },
        { title: 'Humidity', data: props.data.chart.humidity }
    ]
    const color = props.color;

    const find = ((chartKey) => charts.find((chart) => chart.title === chartKey));
    const temperature = () => setChart(find('Temperature'))
    const precipitation = (() => setChart(find('Chance of Precipitation')));
    const humidity = (() => setChart(find('Humidity')))
    useEffect(() => {
        setChart(find('Temperature'))

    }),[props.data];
    const time = props.data.time
    const title = currentChart.title
    
    const style = ((x) => {
        let list = [
            {
                class: 'con',
                style: {
                    'display': 'flex',
                    'justifyContent': 'center',
                    'alignItems': 'center',
                }
            },
            {
                class: 'media',
                style: {
                    'display': 'flex',
                    'flexDirection': 'column',
                    'width': util.isMobile ? "100%" : "60%",
                }
            }
        ];
        let css = list.find(((obj) => obj.class === x));
        return css.style;
    });
    
    return (
        <div style={style('con')}>
            <div style={style('media')}>
                < LineChart color={color} time={time} title={title} data={currentChart.data} />
                <Buttons color={color} temperature={temperature} precipitation={precipitation} humidity={humidity} />
            </div>
        </div>
    );
});

export default Chart;

