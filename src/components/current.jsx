import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import { StyleContext } from './context';
import { dataContext } from '../App'

const Current = ((props) => {
    const data = useContext(dataContext)
    const style = useContext(StyleContext)
    const [currentData, setCurrentData] = useState(data.current)
    useEffect(() => {
            setCurrentData(data.current)
        }, [data]);
    try {
        const desc = currentData.description;
        const temp = `${currentData.temp}\u00b0F`;
        const precipitation = `${currentData.precipitation}% chance`;
        const humidity = `Humidity: ${currentData.humidity}%`;
        const wind = `Wind: ${currentData.windDirection} ${currentData.windSpeed}`;
        const city = currentData.city
        const state = currentData.state
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
    } catch (error) {
        console.log(error)
    }
});

export default Current;   