const mapbox = require("./mapbox");
const darksky = require("./darksky");

const forecast = (address, callback) => {
    
    mapbox(address, (error,{latitude, longitude, location} ={}) => {
        if(error) {
            callback(error,undefined)
        } else {
            darksky(latitude,longitude, (error, forecast) => {
                if(error) {
                    callback(error,undefined)
                } else
                {
                    
                    callback(undefined,
                        {
                            forecast,
                            location
                        }
                    )
                }
            })
        }
    })
};

module.exports = forecast;