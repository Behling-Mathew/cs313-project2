const express = require("express");
const PORT = process.env.PORT || 5000;

let app = express();

app.use(express.static("public"));

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

app.listen(PORT, function() {
    console.log("The server is listening at", PORT);
});

// Model