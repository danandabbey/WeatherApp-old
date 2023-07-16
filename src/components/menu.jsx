'use strict'

import React from 'react'
    class Navigation extends React.Component {
        constructor(props) {
            super(props)
            this.style = {
                button:{
                'gap': '1em',
                'padding-bottom': '5em',
                'justify-self': 'center',
                'background': 'none',
                'border': 'none',
                'text-align': 'center',
                'font-size': '1.5em'
                },
                nav:{
                'display': 'flex',
                'flex-direction': 'column-reverse',
                'gap': '1em',
                'padding-bottom': '5em',
                'justify-self': 'center',
                'width': '100%',
                'font-size': '1.5em',
                'align-self': 'flex-end',
                'text-align': 'center'
                },
                menu:{
                'width': '100%',
                'font-size': '1.5em',
                'align-self': 'flex-end',
                'text-align': 'center',
                'display': 'inline'
                },
                hidden:{
                'flex- direction': 'column',
                'gap': '.5em',
                'display': 'none'
            }
            }
        }
            loc(url){
        window.location.href = `${url}.html`;
        };
        control(){
        if (this.style.hidden.display === 'flex') {
            this.style.hidden.display = 'none'
        } else {
            this.style.hidden.display = 'flex'
        }
        };
        render() {
            const style = this.style;
            return (
                <nav style={style.nav}>
                    <div style={style.menu} onClick={this.control}>Menu</div>
                    <div id='hidden' style={style.hidden}>
                        <button style={style.button} onClick={this.loc('index')}>Home</button>
                        <button style={style.button} onClick={this.loc('about')}>About</button>
                        <button style={style.button} onClick={this.loc('projects')}>Projects</button>
                    </div>
                </nav>
            )
        };
};
    
export default Navigation;