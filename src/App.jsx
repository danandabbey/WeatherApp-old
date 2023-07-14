import React, { StrictMode, useState } from 'react'
import {createRoot} from 'react-dom/client';
import Current from './components/current';
import TwelveHour from './components/twelveHours';
import Location from './call.mjs'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentData: null,
            twelveHourData: null
        };
        this.style = {
            center: {
                'display': 'flex',
                'flexDirection': 'row',
                'justifyContent': 'center',
                'height': '100%',
                'width': '100%'
            },
            panel: {
                'display': 'flex',
                'width': '20%',
                'height': '100%'
            },

            main: {
                'alignItems': 'center',
                'display': 'flex',
                'flexDirection': 'column',
                'gap': '5em',
                'marginBottom': '5em'
            }
        };
    };
    async componentDidMount() {
        const location = new Location();
        try {
            let response = await location.get();
            const currentData = await location.hourly(response);
            const twelveHourData = await location.daily(response);
            this.setState({
                currentData,
                twelveHourData
            });
        } catch (error) {
            console.log(error);
        }
    }
    render() {

        const { currentData, twelveHourData } = this.state;
        const style = this.style;

        return (
            <div style={style.center}>
                <div style={style.panel} />
                <main style={style.main}>
                    <Current id="current" data={currentData} />
                    <TwelveHour id="twelveHour" data={twelveHourData} />
                </main>
                <div style={style.panel} />
            </div>
        );
    };
};

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

export default App;
