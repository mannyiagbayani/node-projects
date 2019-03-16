const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const forecast = require("./util/forecast");

const developer = "Manny Ibasco Agbayani";
const PORT = process.env.PORT || 3000;

//path for Express Config
const template_views = path.join(__dirname,"../templates/views");
const template_partials = path.join(__dirname,"../templates/partials");

//handlebars and views
app.set('view engine','hbs');
app.set("views", template_views);
hbs.registerPartials(template_partials);

//default path for public directory
const directoryPath = path.join(__dirname,"../public");
app.use(express.static(directoryPath));

app.get("", (req,res) => {
    res.render('index', {
        title: "Index",
        developer
    })
});


app.get("/help", (req,res) => {
    res.render('help', {
        title: "Help",
        message: "How can i help?",
        developer
    })
});

app.get("/about", (req,res) => {
    res.render('about', {
        title: "About",
        developer
    })
});

app.get("/weather", (req,res) => {
    res.render('index', {
        title: "Index",
        developer
    })
});

app.get("/weatherNZ",(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please specify address"
        })
    };

    forecast(req.query.address,(error,{forecast,location} ={}) => {
        if(error) {
            return res.send({
                error
            })
        } else {
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address,
                developer: developer
            })
        }
    })
    
});

app.get("/help/*",(req,res) => {
    res.render("404", {
        title: "404",
        message: "Help article not found",
        developer
    })
});

app.get ("*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Page not found",
        developer
    })
});

app.listen(PORT, () => {
    console.log("listening to port " + PORT)
})