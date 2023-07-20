import { useEffect, useState } from "react"

const Loading = ((props) => {

    const [state, setState] = useState('');

    useEffect(() => {
        let n = 0;
        let interval = setInterval(() => {
            if (n < 10) {
                setState((state) => state + '.');
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
            <p>{state}</p>
        </div>
    );
});

export default Loading