import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

const isMobile = window.innerWidth < 900 ;


const Buttons = (({ temperature, precipitation, humidity }, props) => {
    
    let num = isMobile ? 20 : 24;
    let n = isMobile?'1em':'1.5em'

    const style = {
        button: {
            'fontSize': num,
            'border': 'none',
            'background': 'none',
            'color': 'black'
        },
        buttonCon: {
            'paddingTop': '2em',
            'display': 'flex',
            'flexDirection': 'row',
            'justifyContent': 'center',
            'gap': n
        }
    };
    return (
    <div style={style.buttonCon}>
        <button style={style.button} onClick={temperature}>Temperature</button>
        <button style={style.button} onClick={precipitation}>Precipitation</button >
        <button style={style.button} onClick={humidity}>Humidity</button>
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


const LineChart = ((props) => {

    let num = isMobile ? 15 : 30;
        
        const title = props.title
        const chartData = props.chartData
        const time = props.time
    const style = {
        'borderTop': 'solid black .1em',
        'borderBottom': 'solid black .1em'

    };
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
                    padding:20
                }
            }
        };
        const data = {
            labels: time, 
            datasets: [{
                label: 'Time',
                data: chartData,
                borderColor: 'black',
                tension: .5
            }]
        };
    
    return (
        <Line style={style} data={data} options={options} />
        )
})


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.chartKey = ['Temperature', 'Chance of Precipitation', 'Humidity']
        this.state = {
            currentChart: null,
        }
    };
    find = (ChartKey) => {
        return this.charts.find((chart) => chart.title === ChartKey)
    };
    temperature = () => {
        const Temperature = this.find('Temperature');
        this.setState({currentChart: Temperature})
    };
    precipitation = () => {
        const Precipitation = this.find('Chance of Precipitation');
        this.setState({currentChart: Precipitation})
    };
    humidity = () => {
        const Humidity = this.find('Humidity');
        this.setState({currentChart: Humidity})
    };

    async componentDidMount() {
        const { data } = this.props;
        const { chart } = data
        this.charts = [chart.temp, chart.precipitation, chart.humidity]
        this.setState({
            currentChart: this.charts[0],
        })
    };
    render() {
        try {
            const { currentChart } = this.state
            if (!currentChart) {
                return null
            }

            const { data } = this.props;
            const { time } = data
            const { title, chartData } = currentChart

                let num = isMobile ? "100%" : "60%";

            const style = {
                con: {
                    'display': 'flex',
                    'justifyContent': 'center',
                    'alignItems': 'center',
                },
                media: {
                    'display': 'flex',
                    'flexDirection': 'column',
                    'width': num,
                }
            };
            return (
                <div style={style.con}>
                    <div style={style.media}>
                        < LineChart time={time} title={title} chartData={chartData} />
                        <Buttons temperature={this.temperature} precipitation={this.precipitation} humidity={this.humidity} />
                    </div>
                </div>
            );
        } catch (error) {
            console.log(error)
            return null;
        }
    };
};

export default Chart;

