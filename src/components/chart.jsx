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

const LineChart = ((props) => {
    const id = props.id;
    const style = {
        'display': 'flex',
        'width':'50em'
    };
    const title = props.title;
    const data = {
        labels: props.time,  //array
        datasets: [{
            label: 'Time',
            data: props.data, //array
            borderColor: 'black',
            tension: .5,
        }]
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
    try {
        return (
            <div style={style} id={id}>
                <Line
                    data={data}
                    options={options}
                ></Line>
            </div>
        )
    } catch (error) { console.log(error) }
});

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            'display': 'flex',
            'flexDirection':'row'
        };
    };
    render() {
        try {
            const { data } = this.props;
            const chartDataArray = Object.values(data.chart);

            return (
                <div style={this.style}>
                    {chartDataArray.map((prop) => {
                        return <LineChart key={prop?.title} title={prop?.title} time={data.time} data={prop?.data} ></LineChart>
                    })}
                </div>
            );
        } catch (error) { console.log(error) }
    };
};

export default Charts;