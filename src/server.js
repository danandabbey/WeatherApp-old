import express from 'express';
import axios from 'axios'

let app = express();

const server = app.listen(5000, function (req,res) {
    call(86,52)
})


const call = (async (lat, lon) => {
    axios.get(`https://api.weather.gov/points/${lat},${lon}`,[])
        .then(function (response) {
            response.json();
            console.log(response)
            return response;
        });
});






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
    async call(lat, lon) {
        try {
            let response = await fetch(`https://api.weather.gov/points/${lat},${lon}`)
                .then((value) => value.json());
            return new Data(response);
        } catch (error) {
            console.log(`Error: ${error.code} Message: ${error.message}`);
        }
    };
};

class Data {
    constructor(response) {
        this.response = response;
    };
    async call() {
        try {
            let hourly = this.response[`properties`][`forecastHourly`];
            let daily = this.response[`properties`][`forecast`];
            this.city = this.response['properties']['relativeLocation']['properties']['city'];
            this.state = this.response['properties']['relativeLocation']['properties']['state'];
            this.daily = await fetch(daily).then((response) => response.json());
            this.hourly = await fetch(hourly).then((response) => response.json());
            return this;
        } catch (error) {
            console.log(`Error: ${error.code} Message: ${error.message}`);
        }
    };
};

export default Location;
