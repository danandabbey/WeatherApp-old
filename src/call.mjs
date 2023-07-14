import * as data from "./data.mjs"

class Location {
    constructor() {
        this.options = { enableHighAccuracy: true };
    };
    async get() {
        try {
            const position = await new Promise((success, error) => {
                navigator.geolocation.getCurrentPosition(
                    success,
                    error,
                    this.options
                )
            });
            const crd = position.coords;
            const lat = crd.latitude;
            const lon = crd.longitude;
            let response = await this.call(lat, lon);
            return response;

        } catch (error) {
            console.log(`Error: ${error.code} Message: ${error.message}`);
        };
    };
    async call(lat,lon) {
        let response = await fetch(`https://api.weather.gov/points/${lat},${lon}`)
            .then((value) => value.json());
        return response
    };
    async hourly(response) {
        let hourly = response[`properties`][`forecastHourly`];
        const current = await fetch(hourly).then((response) => response.json());
        const x = new data.CurrentData(current);
        return x;
    };
    async daily(response) {
        let daily = response[`properties`][`forecast`];
        const twelveHour = await fetch(daily).then((response) => response.json());
        const x = new data.EveryTwelveHourData(twelveHour.properties.periods);
        x.create()
        return x.list;
    };
};

export default Location;
