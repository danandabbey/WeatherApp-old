import React, { StrictMode, useState, useEffect, createContext, useContext} from 'react'
import {styles} from '../assets/Themes.mjs';

export const MobileContext = createContext({});
export const StyleContext = createContext({})

export const ContextProvider = ((props) => {
    const cutOff = 900;
    const [theme, setTheme] = useState('dark')
    const [mobile, setMobile] = useState(window.innerWidth <= cutOff)
    const [style, setStyle] = useState(styles(theme))

    useEffect(() => {
        setStyle(styles(theme));
    }, [theme]);

    useEffect(() => {
        const preferredDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(preferredDarkTheme ? 'dark':'light')
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
