import { MongoClient } from 'mongodb';
import * as assert from 'assert';

export class MongoCollection {
    private collection;

    constructor (private url: string, collectionName ) {
      MongoClient.connect(this.url, (err, db) => {
        assert.equal(null, err);
        this.collection = db.collection(collectionName);
        console.log('Connected successfully to server');
      });
    }

    insertElements(data, callback) {
      this.collection.insertMany(data, (err, result) => {
        assert.equal(err, null);
        console.log(`Inserted ${data.length} documents into the collection`);
        callback(result);
      });
    }

    showElements() {
      this.collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('Showed all records');
        console.log(docs);
      });
    }

    findElement(parameter: JSON, callback) {
      this.collection.find(parameter).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs)
        callback(docs);
      });
    }

    updateElement(parameter: JSON, data: JSON, callback) {
      this.collection.updateOne(parameter
        , { $set: data }, (err, result) => {
          assert.equal(err, null);
          console.log('Updated file');
          callback(result);
      });
    }

    updateAllElements(parameter: JSON, data: JSON, callback) {
      this.collection.update(parameter
        , { $set: data }, (err, result) => {
          assert.equal(err, null);
          console.log('Updated file');
          callback(result);
      });
    }

    removeElement(parameter: JSON, callback) {
      this.collection.deleteOne(parameter, (err, result) => {
        assert.equal(err, null);
        console.log('Removed file');
        callback(result);
      });
    }


}