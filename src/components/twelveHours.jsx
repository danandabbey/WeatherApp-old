import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import { StyleContext } from './context';

let Forecast = ((props) => {
    const style = useContext(StyleContext)
    return (
        <div className='forecast' style={style.forecast}>
    
                <div style={style.forecastName}>{props.name}</div>
                <div>{props.temp}</div>
                <div>{props.precipitation}</div>
            </div>
    );
});

const TwelveHour = ((props) => {
    const style = useContext(StyleContext)
    try {
        const { data } = props;
        const isDay = data.filter((obj) => obj.isDayTime === true)
        const five = isDay.slice(0, 5)
        let n = 0
        return (
            <div className={'twelveHour'} style={style.twelveHour} >
                {five?.map((prop) => {
                    const name = prop.name;
                    const temp = `${prop.temp}\u00b0 F`;
                    const precipitation = `precipitation: ${prop.precipitation}%`;
                    return <Forecast key={Math.random()} name={name} temp={temp} precipitation={precipitation} />
                })}
            </div>
        );
    } catch (error) {
        console.log(error)
    }
});

export default TwelveHour;
