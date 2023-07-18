import React from 'react'

let Forecast = ((props) => {
    const style = {
        'flexDirection': 'column',
        'padding': '.2em',
        'alignItems': 'center',
        'display': 'flex',
        'gap': '.5em',
        'border': 'solid lightGray .1em',
        'borderRadius': '5px',
        'justifyContent': 'center',
        'minWidth': '10em',
        'minHeight':'8em'
    };
    try {
        return (
            <div style={style}>
                <div>{props.name}</div>
                <div>{props.temp}</div>
                <div>{props.precipitation}</div>
            </div>
        );
    } catch(error){console.log(error)}
});

class TwelveHour extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            'alignItems': 'center',
            'justifyContent': 'center',
            'display': 'flex',
            'flexWrap': 'wrap',
            'gap': '.2em',
            'paddingTop': '5em',
            'paddingBottom': '5em'
        };
    };
    render() {
        try {
            const { data } = this.props;
            const isDay = data.filter((obj) => obj.isDayTime === true)
            return (
                <div style={this.style} >
                    {isDay?.map((prop) => {
                        const name = prop.name;
                        const temp = `${prop.temp}\u00b0 F`;
                        const precipitation = `precipitation: ${prop.precipitation}%`;
                        return <Forecast key={name} name={name} temp={temp} precipitation={precipitation} />
                    })}
                </div>
            );
        } catch (error) { console.log(error) }
    };
};

export default TwelveHour;
