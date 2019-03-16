const request = require('request');

const mapbox = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFubnlpYWdiYXlhbmkiLCJhIjoiY2p0N2g5OWZkMHJ5eDQ5bzZpYm81bmtnciJ9.XQh0jFGdxwXoa28BkrCHuQ`;
 
    request({url: url, json: true}, (error,response) => {
        if(error) {
            callback(error, undefined)
        }
        else if (response.body.features.length ===0) {
            callback("Address cant be found", undefined);
        }
        else
        {
            const data = response.body;
            const latitude = data.features[0].center[0];
            const longitude = data.features[0].center[1];
            const location = data.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    })
}

module.exports = mapbox;