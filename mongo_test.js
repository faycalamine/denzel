const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var fs = require('fs');
var movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
// Connection URL
const url = 'mongodb+srv://master:1234@movies-cv93f.mongodb.net/test?retryWrites=true';

MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    
    var db = client.db('movies');
    const collection = db.collection('movies');
    console.log("connected");
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      
    });
    /*db.collection("movies").insertMany(movies, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount+" documents inserted");
      // close the connection to db when you are done with it
      
  });*/
});