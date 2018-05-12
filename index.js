const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
    .options({
        address: {
            describe: 'Address to fetch weather for',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const weatherAPIHandler = (errorMsg, wInfo) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        console.log(`
            Current Temperature: ${wInfo.temperature}
            Feels Like: ${wInfo.apparentTemperature}
        `);
    }
};

const geocodeAPIHandler = (errorMsg, geoInfo) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        // console.log(JSON.stringify(geoInfo, undefined, 2));
        console.log(`
            Address: ${geoInfo.address}
        `);
        weather.weatherInfo(geoInfo, weatherAPIHandler);
    }
};

geocode.geocodeAddress(argv.address, geocodeAPIHandler);