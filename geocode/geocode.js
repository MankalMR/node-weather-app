const request = require('request');
const keys = require('../keys/keys');

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const apiKey = keys.fetchKey('google_geocode_api');
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
    }, (error, response, data) => {
         if (data.results.length) {
            // console.log(`Address Info: ${data.results[0].formatted_address}`);
            callback(null, {
                address: data.results[0].formatted_address,
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng
            });
        } else if (error) {
            callback('Could not connect to Google Servers to fetch data...');
        } else {
            let errorMsg = data.status;
            switch (data.status) {
                case 'ZERO_RESULTS': {
                    errorMsg += `: Unable to find that address... Please try a different Address!`;
                    break;
                }
                case 'OVER_QUERY_LIMIT': {
                    errorMsg += `: API Daily Limit Reached... Please check Google Dev Console!`;
                    break;
                }
                default: break;
            }
            callback(errorMsg);
        }
    });
};

module.exports = {
    geocodeAddress
};

