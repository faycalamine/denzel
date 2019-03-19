const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var fs = require('fs');
var express = require("express");

var movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
const url = 'mongodb+srv://master:1234@movies-cv93f.mongodb.net/test?retryWrites=true';




MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    
    var db = client.db('movies');
    const collection = db.collection('movies');
    
    
    db.collection("movies").insertMany(movies, function(err, res) {
      if (err) throw err;
      console.log(res.insertedCount+" documents inserted");
      // close the connection to db when you are done with it
      
  });
});