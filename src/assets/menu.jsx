'use strict'

import React from 'react'
const Menu = ((props) => {
    
    const control = (() => {
        if (style.hidden.display === 'flex') {
            style.hidden.display = 'none'
        } else {
            style.hidden.display = 'flex'
        }
    })
    const style = {
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
            hidden: {
                'flex- direction': 'column',
                'gap': '.5em',
                'display': 'none'
            }


    return (
            <nav style={style.nav}>
                <div style={style.menu} onClick={this.control}>Menu</div>
                <div id='hidden' style={style.hidden}>
                    <button style={style.button} onClick={this.loc('projects')}>Color</button>
                </div>
            </nav>
        )
})


export default Navigation;