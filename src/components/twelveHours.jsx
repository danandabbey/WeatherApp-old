import React from 'react'

let Forecast = ((props) => {
    const style = {
        'padding': '.2em',
        'alignItems': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'gap': '.5em',
        'border': 'solid #000 .1em',
        'border-radius': '5px',
        'width': '12em',
        'height': '5em',
        'justifyContent': 'center',
        'flexWrap': 'wrap'
    };
        
    return (
        <div style={style}>
            <div>{props.name}</div>
            <div>{props.temp}</div>
            <div>{props.rain}</div>
        </div>
    )
});

class TwelveHour extends React.Component {
    constructor(props) {
        super(props)
        this.style = {
            'alignItems': 'center',
            'justifyContent': 'center',
            'width': '80em',
            'display': 'flex',
            'flexDirection': 'row',
            'flexWrap': 'wrap',
            'gap': '.2em'
        }
    };
    render() {
        const { data } = this.props;
        console.log(data)

        return (
            <div style={this.style} >
                {data?.map((prop) => {
                    const name = prop.name;
                    const temp = `${prop.temp}\u00b0 F`;
                    const precipitation = `precipitation: ${prop.precipitation}%`;
                    return <Forecast key={name} name={name} temp={temp} precipitation={precipitation} />
                })}
            </div>
        )
    };
};

export default TwelveHour;
