const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var fs = require('fs');
var movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
//console.log(movies);

const CONNECTION_URL = "mongodb+srv://master:1234@movies-cv93f.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "example";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));



app.listen(3000, () => {

    const uri = "mongodb+srv://master:1234@movies-cv93f.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, db) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   db.collection("movies").insertMany(movies, function(err, res) {
     if (err) throw err;
     console.log(res.insertedCount+" documents inserted");
     // close the connection to db when you are done with it
     db.close();
 });
   //
   // perform actions on the collection object
   
});
  
});