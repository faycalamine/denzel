const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var fs = require('fs');
var movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
// Connection URL
const url = 'mongodb+srv://master:1234@movies-cv93f.mongodb.net/test?retryWrites=true';

var express = require("express");
var app = express();
app.listen(9292, () => {
 console.log("Server running on port 9292");
 console.log("Queries available:");
 
});


MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    
    var db = client.db('movies');
    const collection = db.collection('movies');
    console.log("connected");
    app.get("/movies", (req, res, next) => {
      collection.aggregate([{ $sample: { size: 1 } }]).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs); res.json(docs);
      
    });
     });
     app.get("/movies/populate", (req, res, next) => {
      collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs); res.json(docs);
      
    });
     });
    
      app.get('/movies/search', (req, res, next) => {
            var my_limit = parseInt( req.param('limit'));
            
            var my_metascore = parseInt( req.param('metascore'));
            if (req.param('limit')==null)my_limit=5;
            if(req.param('metascore')== null) my_metascore=0;
            collection.aggregate([
              { $match: { metascore: { $gte: my_metascore } }},
              { $sample: { size: my_limit } } ]).toArray(function(err, docs) {
              assert.equal(err, null);
              console.log("Found the following records");
              console.log(docs); res.json(docs);
              
            });
        
          });
     app.get('/movies/:id', (req, res, next) => {
      var my_id = req.params.id; console.log(my_id);
      collection.find({id : my_id}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs); res.json(docs);
        
      });
      
    });

    
    
    /*db.collection("movies").insertMany(movies, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount+" documents inserted");
      // close the connection to db when you are done with it
      
  });*/
});