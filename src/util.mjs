const isMobile = window.innerWidth < 900

const isDesktop = window.innerWidth > 900

const listen = ((event, callBack) => {
    if (event === 'resize') {
        window.addEventListener('resize', callBack)
    };

})

export {isMobile, listen, isDesktop}


