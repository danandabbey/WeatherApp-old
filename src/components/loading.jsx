import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'

const Loading = ((props) => {

    const [msg, setState] = useState('');

    useEffect(() => {
        let n = 0;
        let interval = setInterval(() => {
            if (n < 10) {
                setState((msg) => msg + '.');
                n++
            } else {
                setState('Please allow location access');
                clearInterval(interval);
            };
        }, 500);
        return (() => clearInterval(interval));
    }, []);
    
    return (
        <div className="loading">
            <p>{msg}</p>
        </div>
    );
});

export default Loading