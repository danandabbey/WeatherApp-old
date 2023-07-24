const current = ((data) => {
    const average = ((x, y) => {
        let one = x === null ? 0 : x;
        let two = y === null ? 0 : y;
        let minutes = new Date().getMinutes();
        return minutes > 30 ?
            minutes > 45 ?
                Math.round((one * 1 + two * 3) / 4)
                : Math.round((one * 1 + two * 2) / 3)
            : (minutes < 30) ?
                minutes < 15 ?
                    Math.round((one * 3 + two * 1) / 4)
                    : Math.round((one * 2 + two * 1) / 3)
                : Math.round((one + two) / 2);
    });
    const one = data['hourly'][0]
    const two = data['hourly'][1]
    class Current {
        constructor() {
            this.temp =  average(one['temperature'], two['temperature']);
            this.precipitation = average(one['probabilityOfPrecipitation']['value'], two['probabilityOfPrecipitation']['value']);
            this.humidity = average(one['relativeHumidity']['value'], two['relativeHumidity']['value']);
            this.windSpeed = one['windSpeed'];
            this.description = one['shortForecast'];
            this.isDayTime = one['isDaytime'];
            this.windDirection = one['windDirection'];
            this.city = data.location['city'];
            this.state = data.location['state'];
        }
    }
    return new Current();
});

const forecast = ((data) => {
    try {
        const modifyHours = ((hour) => {
            return hour === 0 ?
                `12am` : hour > 12 ?
                    `${hour = hour - 12}pm` : hour === 12 ?
                        `12pm` : `${hour}am`
        });
        const check = ((x) => x === null ? 0 : x);
        class Forecast {
            constructor(data) {
                this.name = data['name'];
                this.time = modifyHours(new Date(data['startTime']).getHours())
                this.shortDesc = data[`shortForecast`];
                this.longDesc = data[`detailedForecast`];
                this.temp = data['temperature'];
                this.precipitation = check(data['probabilityOfPrecipitation']['value']);
                this.humidity = check(data['relativeHumidity']['value']);
                this.windSpeed = data['windSpeed'];
                this.isDayTime = data['isDaytime'];
            };
        };
        return new Forecast(data)
    } catch (error) {
        console.log(error);
    }
});

const everyTwelveHourData = ((data) => {
    try {
        const daily = data.daily
        let list = [];
        let n = 1
        while (n <= 10) {
            list.push(forecast(daily[n]));
            n++
        }
        return list
    } catch (error) {
        console.log(error);
    };
});

const chartData = ((data) => {
    try {
        const hourly = data.hourly
        let time = [];
        let chart = {
            temp: {
                title: 'Temperature',
                data: []
            },
            precipitation: {
                title: 'Chance of Precipitation',
                data: []
            },
            humidity: {
                title: 'Humidity',
                data: []
            }
        };
        let n = 0
        while (n < 13) {
            let info = hourly[n]
            let x = forecast(info);
            time.push(x.time);
            chart.temp.data.push(x.temp);
            chart.precipitation.data.push(x.precipitation);
            chart.humidity.data.push(x.humidity);
            n++
        }
        return {
            time: time,
            chart: chart
        };
    } catch (error) {
        console.log(error);
    };
});

class Data{
    constructor(data) {
        this.current = current(data)
        this.twelveHour = everyTwelveHourData(data)
        this.chart = chartData(data)
    }
};

export default Data;