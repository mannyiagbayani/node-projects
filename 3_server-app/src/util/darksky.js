const request = require("request");

const darksky = (latitude, longitude,  callback) => {
    const url = `https://api.darksky.net/forecast/ddfd54b8be2d6a9fbc5b20e68231e83a/${longitude},${latitude}`;
    
    request({url: url, json: true}, (error, response) => {
         if(error) { callback(error.stack,undefined)}
         if(response.body.error !== undefined) {
             callback(response.error,undefined)
         }
        else {
            //console.log(response.body.currently)
            const currently = response.body.currently;
            const daily = response.body.daily.summary;
            const preciptype = response.body.daily.data[0].precipType;
       
            let forecast = `${daily} It is currently ${currently.temperature} degrees out. `
            if(preciptype) {
                forecast += `There is ${currently.precipProbability}% of ${preciptype}.`
            }
            callback(undefined, forecast);
    }
    })
};

module.exports = darksky;