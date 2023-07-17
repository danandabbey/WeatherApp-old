import { Line } from 'react-chartjs-2';
import React from 'react';
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
let Chart = ((props) => {
        const title = props.title
        const chartData = props.chartData
        const time = props.time
        const style = {
            'display': 'flex',
            'width': '40em'
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title,
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

export default Chart;