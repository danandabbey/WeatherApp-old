class Theme {
    constructor(theme) {
        this.newTheme = theme
        this.list = [
            {
                name: 'BlackOnWhite',
                id:1,
                style: {
                    app: {
                        'color': '#000',
                        'backgroundColor': '#fff'
                    },
                }
            },
            {
                name: 'YellowOnGreen',
                id:2,
                style: {
                    app: {
                        'color': '#FFC98A',
                        'backgroundColor': '#005454'
                    },
                }
            },
            {
                name: 'MossyFernDark',
                id:3,
                style: {
                    app: {
                        'color': '#A27B5C',
                        'backgroundColor': '#2C3639'
                    },
                }
            },
            {
                name: 'MossyFernLight',
                id:4,
                style: {
                    app: {
                        'color': '#DCD7C9',
                        'backgroundColor': '#3F4E4F'
                    },
                }
            },
        ];
        const themeObj = this.list.find(((obj) => obj.name === theme));

        this.style = themeObj ? themeObj.style : this.list[0].style
    };
    test() {
        this.newTheme
    }
};

export default Theme;