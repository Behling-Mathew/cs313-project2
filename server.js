const express = require("express");
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const pokeController = require("./controllers/pokeController.js");


let app = express();

app.use(express.static("public"));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    console.log("Received a request for /");
    
    //res.write("You are in the root.");
    res.render("home");
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

// Model



// Test query
/*pool.query('SELECT name FROM pokemon', (err, result) => {
  if (err) {
    return console.error('Error executing query', err.stack)
  }
  console.log(result.rows) 
})*/
//searchPokemon();




