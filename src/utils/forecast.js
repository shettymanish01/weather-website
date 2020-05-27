const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=a3f087bff8fd4e56bcd205613200305&q=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + ',77.59796&days=3'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to fetch forecast')

        } else if (body.error) {
            callback('Invalid Input')
        } else {
            callback(undefined, body.forecast.forecastday[0].day.condition.text + '. It is currently ' + body.current.temp_c + ' degrees out. There is ' + body.current.cloud + '% chances of rain')
        }
    })
}

module.exports = forecast