const request = require("request");

const darksky = (lat,long, location, callback) => {
    const url = `https://api.darksky.net/forecast/ddfd54b8be2d6a9fbc5b20e68231e83a/${long},${lat}`;
    //console.log(url)
    request({url: url, json: true}, (error, response) => {
         if(error) { callback(error.stack,undefined)}
         if(response.body.error !== undefined) {
             callback(response.error,undefined)
         }
        else {
            const currently = response.body.currently;
            const daily = response.body.daily.summary;
            const preciptype = response.body.daily.data[0].precipType;
       
            const message = `${location}....${daily} It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability}% of ${preciptype}.`
            callback(undefined, message);
    }
    })
}

module.exports = darksky;