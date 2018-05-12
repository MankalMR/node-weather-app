const request = require('request');
const keys = require('../keys/keys');

const weatherInfo = (locationInfo, callback) => {
    const apiKey = keys.fetchKey('darksky_api');
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${locationInfo.latitude},${locationInfo.longitude}`,
        json: true
    }, (error, response, data) => {
        if (error) {
            callback('Could not connect to DarkSky API Servers...');
        } else if (data.error) {
            callback(data.error);
        } else {
            callback(null, data.currently);
        }
    });
};

module.exports = {
    weatherInfo
};