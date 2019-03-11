const mapbox = require("./mapbox");
const darksky = require("./darksky")


const forecast = (address, callback) => {
    mapbox(address, (error, {latitude,longitude,location}) => {
        if(error === undefined) {

            darksky(latitude,longitude,location,(error,data) => {
                if(error === undefined) {
                    callback(undefined,data)
                }
            })

        } else callback(error,undefined)
    })
}

module.exports = forecast;
