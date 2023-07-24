import axios from 'axios'

const location = (async()=>{
    const options = { enableHighAccuracy: true };
        try {
            const position = (await new Promise((success, error) => {
                navigator.geolocation.getCurrentPosition(
                    success,
                    error,
                    options
                );
            })).coords;
            const lat = position.latitude;
            const lon = position.longitude;
            let response = await call(lat, lon);
            return response;

        } catch (error) {
            console.log(`Error: ${error.code} Message: ${error.message}`);
        };
    });


const call = (async (lat, lon) => {
    try {
        const response = (await axios.get(`https://api.weather.gov/points/${lat},${lon}`)
            .then((value) => value.data))
        const hourResponse = await axios.get(response[`properties`][`forecastHourly`]).then((response) => response.data).then((response) => response['properties']['periods']);
        const dayResponse = await axios.get(response[`properties`][`forecast`]).then((response) => response.data).then((response) => response['properties']['periods']);
        const call = {
            response: response,
            hourly: hourResponse,
            daily: dayResponse,
            location: {
                city: response['properties']['relativeLocation']['properties']['city'],
                state: response['properties']['relativeLocation']['properties']['state']
            }
        };
        return call;
    } catch (error) {
        console.log(`Error: ${error.code} Message: ${error.message}`);
    }
});

export default location;
