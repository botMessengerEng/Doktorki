var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var collectionName = 'movie';
var url = 'mongodb://localhost:27017/moviecDB';
// Use connect method to connect to the server
var db=MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertElements(db,'movies', [{imieniny: "Ani", urodziny: "to nie dzis"}],() =>{
    findElements(db, function() {
      db.close();
    });
  });
});


var insertElements = function(db, collectionName, data, callback) {
  // Get the documents collection
  var collection = db.collection(collectionName);
  // Insert some documents
  collection.insertMany(data, function(err, result) {
    assert.equal(err, null);
    console.log(`Inserted ${data.length} documents into the collection`);
    callback(result);
  });
}


var findElements = function(db, callback) {
  // Get the documents collection
  var collection = db.collection(collectionName);
  // Find some documents
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}



var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection(collectionName);
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 3 }
    , { $set: { c : 7 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}



var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection(collectionName);
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}




var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 1 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};




