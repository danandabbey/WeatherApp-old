class CurrentData {
    constructor(hourly,city,state) {
        this.hourOne = hourly['properties']['periods'][0];
        this.hourTwo = hourly['properties']['periods'][1];
        this.temp = this.average(this.hourOne['temperature'], this.hourTwo['temperature']);
        this.precipitation = this.average(this.hourOne['probabilityOfPrecipitation']['value'], this.hourTwo['probabilityOfPrecipitation']['value']);
        this.humidity = this.average(this.hourOne['relativeHumidity']['value'], this.hourTwo['relativeHumidity']['value']);
        this.windSpeed = this.hourOne['windSpeed'];
        this.description = this.hourOne['shortForecast'];
        this.isDayTime = this.hourOne['isDaytime'];
        this.windDirection = this.hourOne['windDirection']
        this.city = city
        this.state = state
    };
    check(x) {
        if (x === null) {
            return 0;
        } else {
            return x;
        }
    };
    average(one, two) {
        let hourOne = this.check(one);
        let hourTwo = this.check(two)
        let minutes = new Date().getMinutes();
        if (minutes > 30) {

            if (minutes > 45) {
                return Math.round((hourOne * 1 + hourTwo * 3) / 4)
            } else {
                return Math.round((hourOne * 1 + hourTwo * 2) / 3)
            }
        } else if (minutes < 30) {
            if (minutes < 15) {
                return Math.round((hourOne * 3 + hourTwo * 1) / 4)
            } else {
                return Math.round((hourOne * 2 + hourTwo * 1) / 3)
            }
        } else {
            return Math.round((hourOne + hourTwo) / 2);
        }
    };
};

class Forecast {
    constructor(data) {
        this.name = data['name'];
        this.x = new Date (data['startTime']);
        this.time = this.x.toLocaleTimeString('en-US');
        this.shortDesc = data[`shortForecast`];
        this.longDesc = data[`detailedForecast`];
        this.temp = data['temperature'];
        this.precipitation = this.rain(data);
        this.humidity = data['relativeHumidity']['value'];
        this.windSpeed = data['windSpeed'];
        this.isDayTime = data['isDaytime'];
    };
    rain(data) {
        let x = data['probabilityOfPrecipitation']['value'];
        if (x === null) {
            return 0;
        }
        else {
            return x
        }
    };
};

class EveryTwelveHourData {
    constructor(daily) {
        this.data = daily['properties']['periods']
        this.list = [];
    }
    create() {
        try {
            let n = 1
            while (n <= 10) {
                let x = this.data[n]
                x = new Forecast(x);
                this.list.push(x);
                n++
            }
            return this.list
        } catch (error) {
            console.log(error);
        }
    };
};

class ChartData {
    constructor(hourly) {
        this.hourly = hourly
        this.time = [];
        this.chart = {
            temp: {
                title: 'Temperature',
                chartData: []
            },
            precipitation: {
                title: 'Chance of Precipitation',
                chartData: []
            },
            humidity: {
                title: 'Humidity',
                chartData: []
            }
        }
    }
    create() {
        try {
            let n = 0
            while (n < 13) {
                let info = this.hourly['properties']['periods'][n]
                let forecast = new Forecast(info);
                this.time.push(forecast.time);
                this.chart.temp.chartData.push(forecast.temp);
                this.chart.precipitation.chartData.push(forecast.precipitation);
                this.chart.humidity.chartData.push(forecast.humidity);
                n++
            }
            return this;
        } catch (error) {
            console.log(error);
        };
    }
};

export { ChartData, EveryTwelveHourData, CurrentData };