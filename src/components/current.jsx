import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import { StyleContext } from './context';

const Current = ((props) => {
    const style = useContext(StyleContext)
    try {
        const { data } = props;
        const desc = data?.description;
        const temp = `${data?.temp}\u00b0F`;
        const precipitation = `${data?.precipitation}% chance`;
        const humidity = `Humidity: ${data?.humidity}%`;
        const wind = `Wind: ${data.windDirection} ${data?.windSpeed}`;
        const city = data.city
        const state = data.state
        return (
            <div className='current' style={style.current}>
                <div style={style.currentTitle} className='name'>{city}, {state}</div>
                <br />
                <div>{desc}</div>
                <div>{precipitation}</div>
                <div>{temp}</div>
                <br />
                <div>{humidity}</div>
                <div>{wind}</div>
            </div>
        );
    } catch (error) { console.log(error) }
});

export default Current;   