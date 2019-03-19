const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var fs = require('fs');
var express = require("express");

var movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
const url = 'mongodb+srv://master:1234@movies-cv93f.mongodb.net/test?retryWrites=true';

var app = express();
app.listen(9292, () => {
 console.log("Server running on port 9292");
 console.log("Queries available:");
 
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


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

    app.post('/movies', (req, res, next) => {
      var my_date =  req.param('date');
      var my_review = req.param('review');
      var my_id= req.param('id');
      collection.updateOne(
        { id: my_id },
        {
          $set: { review:my_review, date:my_date },
          $currentDate: { lastModified: true }
        }
     );


      return res.send(my_date+" "+my_review+" "+my_id);
  
    });

    

});