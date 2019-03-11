const request = require("request");

const mapbox = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFubnlpYWdiYXlhbmkiLCJhIjoiY2p0M3ZxZDFqMmVjeTQ5b3NqbTI1cXFkZiJ9.El4Ry9OZAuvKm8y9PRHXCw`;

    request({url: url, json: true}, (error, response) => {
        if(error) 
        { 
            callback(error.message, undefined);
        }
        else if (response.body.features.length ===0)
        { 
            console.log(response.body)
            callback("Location cant be tracked. Please try again", undefined);
        }
        else 
        {
            const data = response.body;
            const lat = data.features[0].center[0];
            const long = data.features[0].center[1];
            const location = data.features[0].place_name;

            //console.log(data)
            //console.log(`Latitude: ${lat}`);
            //console.log(`Longitude: ${long}`);

            callback(undefined, {
               latitude: lat,
               longitude: long,
               location:  location
            })
        }
    })
}

module.exports = mapbox;