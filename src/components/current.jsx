'use strict'

import React from 'react'

class Current extends React.Component {
    constructor(props) {
        super(props)
        this.props= props
        this.style = {
            'gap': '2',
            'padding': '1em',
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'border': 'solid #000 .1em',
            'height': '20em',
            'width': '30em',
            'justifySelf': 'center'
        }
    }
    render() {

        const { data } = this.props;
        const desc = data?.description;
        const temp = `${data?.temp}\u00b0F`;
        const precipitation = `${data?.precipitation} chance of rain`;
        const humidity = `${data?.humidity}% humidity`;
        const windSpeed = `wind speed: ${data?.windSpeed}`;

        return (
            <div style={this.style}>
                <h2>Currently</h2>
                <hr />
                <div>{desc}</div>
                <div>{temp}</div>
                <br />
                <div>{precipitation}</div>
                <div>{humidity}</div>
                <div>{windSpeed}</div>
            </div>
        );
    };
};

export default Current;   