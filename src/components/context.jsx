import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import {styles} from '../assets/Themes.mjs';

export const MobileContext = createContext({});
export const StyleContext = createContext({})

export const ContextProvider = ((props) => {
    const cutOff = 900;
    const [theme, setTheme] = useState('light')
    const [mobile, setMobile] = useState(window.innerWidth <= cutOff)
    const [style, setStyle] = useState(styles(mobile, theme))

    useEffect(() => {
        setStyle(styles(mobile, theme));
    }, [mobile, theme]);

    useEffect(() => {
        setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light')
    }, [])
    
    useEffect(() => {
        const handleResize = (() => {
            setMobile(window.innerWidth <= cutOff || undefined)
        });
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <MobileContext.Provider value={mobile}>
            <StyleContext.Provider value={style}>
                {props.children}
            </StyleContext.Provider>
        </MobileContext.Provider>
    );
});