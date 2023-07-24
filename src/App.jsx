import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import {createRoot} from 'react-dom/client';
import Current from './components/current';
import TwelveHour from './components/twelveHours';
import Chart from './components/chart'
import location from './call.mjs'
import Data from './data.mjs'
import Loading from './components/loading';
import CustomError from './components/customError'
import { GlobalContextProvider, StyleContext } from './components/context'

export const dataContext = createContext({})

const App = ((props) => {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const style = useContext(StyleContext)

//**********************************************************************                    

    useEffect(() => {
        try {
            const fetchData = (async () => {
                let loc = await location()
                let data = new Data(loc)
                data ? setData(data) : null
                setLoading(false);
            });
            fetchData();
        } catch (error) {
            setLoading(false)
            setError('Error Loading Data')
            console.log(error)
        };
    }, [])
    return (
        <div className='app' style={style.app}>
            {isLoading ? <Loading /> : false}
            {error ? <CustomError error={error} /> : false}
            {!isLoading && !error && data? (
                <dataContext.Provider value={data}>
                    <Current/>
                    <Chart/>
                    <TwelveHour/>
                </dataContext.Provider>
            ) : null}
        </div>
    );
    
});

//**********************************************************************                    

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <GlobalContextProvider>
            <App />
        </GlobalContextProvider>
    </StrictMode>
);