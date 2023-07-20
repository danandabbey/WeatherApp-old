import React from 'react'

class Current extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    };
    render() {
        try {
            const style = ((x) => {
                let list = [
                    {
                        class: 'h1',
                        style: {
                            'fontSize': '1.5'

                        }
                    }
                ];
                let css = list.find(((obj) => obj.class === x));
                return css.style;
            });

            const { data } = this.props;
            const desc = data?.description;
            const temp = `${data?.temp}\u00b0F`;
            const precipitation = `${data?.precipitation}% chance`;
            const humidity = `Humidity: ${data?.humidity}%`;
            const wind = `Wind: ${data.windDirection} ${data?.windSpeed}`;            
        
            const city = data.city
            const state = data.state
            return (
                <div className={'current'}>
                    <h1 style={style('h1')}>{city}, {state}</h1>
                    <br />
                    <div>{desc}</div>
                    <div>{precipitation}</div>
                    <div>{temp}</div>
                    <br />
                    <p>{humidity}</p>
                    <div>{wind}</div>
                </div>
            );
        } catch (error) { console.log(error) }
    };
};

export default Current;   