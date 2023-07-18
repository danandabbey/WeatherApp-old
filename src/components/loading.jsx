import { useEffect, useState } from "react"

const Loading = ((props) => {

    const [state, setState] = useState('Loading');

    useEffect(() => {
        let n = 0;
        let interval = setInterval(() => {
            if (n < 5) {
                setState((state) => state + '.');
                n++
            } else {
                clearInterval(interval);
                setState('Error :(');
            };
        }, 500);
        return (() => clearInterval(interval));
    }, []);
    
    const style = {
        'display': 'flex',
        'justifyContent': 'center',
        'fontSize': '5em',
        'fontFamily': ['lato', 'Arial', 'Helvetica', 'sansSerif'],
        'textAlign': 'center'
    };
    return (
        <div style={style}>
            <p>{state}</p>
        </div>
    );
});

export default Loading