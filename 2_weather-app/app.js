const request = require("request");
const forecast = require("./utils/forecast.js")

//console.log(process.argv)
const location = process.argv[2];
forecast(location, (error,data) => {
    if(error) return console.log(error)
    console.log(data)
})

