'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

const Menu = (() => {

    let loc = ((url) => {
        window.location.href = `${url}.html`;
    })

    let control = (() => {
        let hidden = document.getElementById('hidden');
        if (hidden.style.display === 'flex') {
            hidden.style.display = 'none'
        } else {
            hidden.style.display = 'flex'
        }
    });

    class Navigation extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            const button = {
                'gap': '1em',
                'padding-bottom': '5em',
                'justify-self': 'center',
                'background': 'none',
                'border': 'none',
                'text-align': 'center',
                'font-size': '1.5em'

            }
            const navStyle = {
                'display': 'flex',
                'flex-direction': 'column-reverse',
                'gap': '1em',
                'padding-bottom': '5em',
                'justify-self': 'center',
                'width': '100%',
                'font-size': '1.5em',
                'align-self': 'flex-end',
                'text-align': 'center'
            }
            const menuStyle = {
                'width': '100%',
                'font-size': '1.5em',
                'align-self': 'flex-end',
                'text-align': 'center',
                'display': 'inline'

            }
            const hiddenStyle = {
                'flex- direction': 'column',
                'gap': '.5em',
                'display': 'none'
            }

            return (
                <nav style={navStyle}>
                    <div style={menuStyle} onClick={control}>Menu</div>
                    <div id='hidden' style={hiddenStyle}>
                        <button style={button} onClick={loc('index')}>Home</button>
                        <button style={button} onClick={loc('about')}>About</button>
                        <button style={button} onClick={loc('projects')}>Projects</button>
                    </div>
                </nav>
            )
        };
    };

let x = document.getElementById('menu');
ReactDOM.render(<Navigation />, x);
});

export default { Menu };