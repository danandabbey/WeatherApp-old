class CurrentData {
    constructor(hourly) {
        this.hourOne = hourly['properties']['periods'][0];
        this.hourTwo = hourly['properties']['periods'][1];
        this.temp = this.average(this.hourOne['temperature'], this.hourTwo['temperature']);
        this.precipitation = this.average(this.hourOne['probabilityOfPrecipitation']['value'], this.hourTwo['probabilityOfPrecipitation']['value']);
        this.humidity = this.average(this.hourOne['relativeHumidity']['value'], this.hourTwo['relativeHumidity']['value']);
        this.windSpeed = this.hourOne['windSpeed'];
        this.description = this.hourOne['shortForecast'];
        this.isDayTime = this.hourOne['isDaytime'];
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
                return ((hourOne * 1) + (hourTwo * 3)) / 4
            } else {
                return ((hourOne * 1) + (hourTwo * 2)) / 3
            }
        } else if (minutes < 30) {
            if (minutes < 15) {
                return ((hourOne * 3) + (hourTwo * 1)) / 4
            } else {
                return ((hourOne * 2) + (hourTwo * 1)) / 3
            }
        } else {
            return ((hourOne + hourTwo) / 2);
        }
    };
};

class Forecast {
    constructor(data) {
        this.name = data['name'];
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
        this.data = daily;
        this.list = [];
    }
    create() {
        console.log(this.data)
        let n = 0
        while (n < 14) {
            let data = this.data[n]
            let x = new Forecast(data);
            this.list.push(x);
            n++
        }
    }
};

export { CurrentData, EveryTwelveHourData };