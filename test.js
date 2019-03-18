var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
var fs = require('fs');
var movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
app.get("/url/a", (req, res, next) => {
    res.json(movies);
   });