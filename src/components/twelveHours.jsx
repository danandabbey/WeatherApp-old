import React, { useState } from 'react';
import * as util from '../util.mjs';

let Forecast = ((props) => {
    try {
        const [mode, setState] = useState(util.isMobile ? 'mobile' : 'desktop');

        const style = ((x) => {
            let list = [
                {
                    class: 'forecast',
                    style: {
                        'minWidth': mode === 'desktop'?'10em':'8em',
                        'minHeight': mode === 'desktop'?'8em':'6em',
                        'fontSize': mode === 'desktop'? '1em':'1.3em',
                        'gap': mode === 'desktop'?'.4em':'.7em',
                        'padding': mode === 'desktop'?'2em':'1em',
                    }
                },
                {
                    class: 'name',
                    style: {
                        'fontSize' : mode === 'desktop'? '1.35em':'1.4'
                    }
                }
            ];
            let css = list.find(((obj) => obj.class === x));
            return css.style;
        });

        return (
            <div className='forecast' style={style('forecast')}>
                <div style={style('name')}>{props.name}</div>
                <div>{props.temp}</div>
                <div>{props.precipitation}</div>
            </div>
        );
    } catch (error){
        console.log(error)
    }
});

class TwelveHour extends React.Component {
    render() {
        try {
        const style = ((x) => {
            let list = [
                {
                    class: 'twelveHour',
                    style: {
                        'gap': '.2em',
                        'paddingTop': '5em',
                        'paddingBottom': '5em'
                    }
                }
            ];
            let css = list.find(((obj) => obj.class === x));
            return css.style;
        });
            const { data} = this.props;
            const isDay = data.filter((obj) => obj.isDayTime === true)
            return (
                <div className={'twelveHour'} style={style('twelveHour')} >
                    {isDay?.map((prop) => {
                        const name = prop.name;
                        const temp = `${prop.temp}\u00b0 F`;
                        const precipitation = `precipitation: ${prop.precipitation}%`;
                        return <Forecast key={name} name={name} temp={temp} precipitation={precipitation} />
                    })}
                </div>
            );
        } catch(error) {
            console.log(error)
        }
    };
};

export default TwelveHour;
