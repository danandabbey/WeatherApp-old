import React from 'react'

class Current extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    };
    render() {
        try {
            const { data } = this.props;
            const desc = data?.description;
            const temp = `${data?.temp}\u00b0F`;
            const precipitation = `Precipitation: ${data?.precipitation}% chance`;
            const humidity = `Humidity: ${data?.humidity}%`;
            const wind = `Wind: ${data.windDirection}  ${data?.windSpeed}`;
            const city = data.city
            const state = data.state


            const style = {
                con: {
                    'fontSize':'1.2em',
                    'gap': '.2em',
                    'padding': '2em',
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifySelf': 'center',
                    'alignItems': 'center',
                    'letterSpacing':'.1px'
                },
                title: {
                    'fontSize': '1.5em',
                    'textAlign' : 'center'
                }
            };
            return (
                <div style={style.con}>
                    <h1 style={style.title}>{city}, {state}</h1>
                    <br />
                    <div>{desc}</div>
                    <div>{temp}</div>
                    <br />
                    <div>{precipitation}</div>
                    <div>{humidity}</div>
                    <div>{wind}</div>
                </div>
            );
        } catch (error) { console.log(error) }
    };
};

export default Current;   