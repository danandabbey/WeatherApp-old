import React from 'react';
import Chart from './chart';

class ChartView extends React.Component {
    constructor(props) {
        super(props);
        this.chartKey = ['Temperature', 'Chance of Precipitation', 'Humidity']
        this.style = {
            main: {
                'display': 'flex',
                'flexDirection': 'row'
            },
            button: {
                'width': '3em'
            }
        };
        this.state = {
            currentChart: null,
            index: 0
        }
    };
    find = (nextChartKey) => {
        return this.charts.find((chart) => chart.title === nextChartKey)
    };
    next = () => {
        const { index } = this.state
        const nextIndex = (index + 1) % this.chartKey.length
        const nextChartKey = this.chartKey[nextIndex];
        const nextChart = this.find(nextChartKey);
        this.setState({
            currentChart: nextChart,
            index: nextIndex
        })
    };
    last = () => {
        const { index } = this.state
        const nextIndex = (index - 1 + this.chartKey.length) % this.charts.length;
        const nextChartKey = this.chartKey[nextIndex];
        const nextChart = this.find(nextChartKey);
        this.setState({
            currentChart: nextChart,
            index: nextIndex,
        })
    };
    async componentDidMount() {
        const { data } = this.props;
        const {chart} = data
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
                const style = this.style
                return (
                    <div style={style.main}>
                        <button style={style.button} onClick={this.last}>last</button>
                        < Chart time={time} title={title} chartData={chartData} />
                        <button style={style.button} onClick={this.next}>next</button>
                    </div>
                );
        } catch (error) {
            console.log(error)
            return null;
        }
    };
};

export default ChartView;

