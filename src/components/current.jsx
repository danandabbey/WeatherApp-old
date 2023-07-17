import React from 'react'

class Current extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.style = {
            'gap': '.2em',
            'padding': '1em',
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'height': '20em',
            'width': '30em',
            'justifySelf': 'center'
        };
    };
    render() {
        try {
            const { data } = this.props;
            const desc = data?.description;
            const temp = `${data?.temp}\u00b0F`;
            const precipitation = `Precipitation: ${data?.precipitation}% chance`;
            const humidity = `Humidity: ${data?.humidity}%`;
            const windSpeed = `Wind: ${data?.windSpeed}`;
            return (
                <div style={this.style}>
                    <h2>Currently</h2>
                    <div>{desc}</div>
                    <div>{temp}</div>
                    <br />
                    <div>{precipitation}</div>
                    <div>{humidity}</div>
                    <div>{windSpeed}</div>
                </div>
            );
        } catch (error) { console.log(error) }
    };
};

export default Current;   