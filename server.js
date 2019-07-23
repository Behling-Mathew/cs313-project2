const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var oldRegion = '';
require('dotenv').config();


const pokeController = require("./controllers/pokeController.js");


let app = express();

app.use(express.static("public"));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");


P.getRegionsList().then(function (response) {
        oldRegion = response.results[0].name;
        console.log(oldRegion);
    })
    .catch(function (error) {
        console.log('There was an ERROR: ', error);
    });



app.get("/", function(req, res) {
    console.log("Received a request for /");
    
    //res.write("You are in the root.");
    var params = {regionName: oldRegion};
    res.render("home", params);
    res.end();
});

app.get("/home", function(req, res) {
    // Controller
    console.log("Received a request for the home page");
    let name = "Mat";
    
    var params = {username: name};
    
    res.render("home", params);
});

app.post("/search", pokeController.search);

app.listen(PORT, function() {
    console.log("The server is listening at", PORT);
});

app.post('/mark', pokeController.mark);

app.post('/release', pokeController.release);





