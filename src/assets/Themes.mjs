let isMobile = window.innerWidth <= 900
const styles = ((theme) => {
        let x = {
        blackAndWhite: {
            color: '#000',
            background: '#fff'
        },
        dark: {
            color: '#A27B5C',
            background: '#2C3639'
        },
        light: {
            color: '#DCD7C9',
            background: '#3F4E4F'
        }
    };
    const color = x[theme].color 
    const background = x[theme].background
    const mobile = ((m, d) => isMobile ? m : d)

    return {
        app: {
            'color': color,
            'backgroundColor': background,
            'fontSize': mobile('1.2em','1.3em'),

        },
        chart: {
            'borderTop': `solid ${color} .1em`,
            'borderBottom': `solid ${color} .1em`
        },
        current: {
            'gap': '.2em',
            'padding': '2em',
            'letterSpacing': '.1px',
            'display': 'flex',
            'flexDirection': 'column',
            'justifySelf': 'center',
            'alignItems': 'center',
            'textAlign': 'center'
        },
        currentTitle: {
            'fontSize': '2em'
        },
        chartCon: {
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center'
        },
        chartBtn: {
            'fontSize': '1.4em',
            'color': color
        },
        chartBtnCon: {
            'gap': '5em',
            'paddingTop': '2em',
            'display': 'flex',
            'flexDirection': 'row',
            'justifyContent': 'center'
        },
        forecast: {
            'minWidth': mobile('4em','6em'),
            'minHeight': mobile('4em','6em'),
            'gap': '.5em',
            'padding': mobile('1.5em','2em'),
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center',
        },
        forecastName: {
            'fontSize': mobile('1.6em','1.5em')
        },
        media: {
            'width': mobile("100%", "70%"),
            'display': 'flex',
            'flexDirection': 'column'
        },
        twelveHour: {
            'gap': '2em',
            'paddingTop': '2em',
            'paddingBottom': '2em',
            'alignItems': 'center',
            'justifyContent': 'center',
            'display': 'flex',
            'flexWrap': 'wrap'
        },
    };
});

export { styles };