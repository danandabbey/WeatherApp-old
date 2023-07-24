import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import CustomError from './customError';

const Loading = ((props) => {

    const [msg, setState] = useState('');
    const [error, setError] = useState(null)


    useEffect(() => {
        let n = 0;
        let interval = setInterval(() => {
            (n < 10) ?
                setState((msg) => msg + '.') : setError('Loading Error', 'Make sure location access is turned on and refresh.');
            if (n === 10) {
                clearInterval(interval);
            }
            n++
        }, 500);
        return (() => clearInterval(interval));
    }, []);
    
    return (
        <div className="loading">
            {msg ?(
                <p>{msg}</p>
            ):null}
            {error ?(
                <CustomError name={error[0]} error={error[1]} />
            ): false}
        </div>
    );
});

export default Loading