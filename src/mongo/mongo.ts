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
      return new Promise(resolve => resolve(true));
    }

    showElements(callback) {
      this.collection.find({}).sort({lastName: 1, firstName: 1}).toArray((err, result) => {
        assert.equal(err, null);
        console.log('Showed all records');
        console.log(result);
        callback(result);
      });
    }

    findElement(parameter, callback) {
      this.collection.find(parameter).sort({ lastName: 1, firstName: 1}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs)
        callback(docs);
      });
      return new Promise(resolve => resolve(true));
    }

     updateElement(parameter, callback) {
      this.collection.updateOne({login: parameter.login}
        , { $set: parameter }, (err, result) => {
          assert.equal(err, null);
          console.log('Updated file');
          callback(result);
      });
    }

    updateAllElements(parameter, data, callback) {
      this.collection.updateMany(parameter
        , { $set: data }, (err, result) => {
          assert.equal(err, null);
          console.log('Updated file');
          callback(result);
      });
    }

    removeElement(parameter, callback) {
      this.collection.deleteOne({login: parameter.login}, 
        (err, result) => {
        assert.equal(err, null);
        console.log('Removed file');
        callback(result);
      });
      return new Promise(resolve => resolve(true));
    }

    removeAllElements(parameter, callback) {
      this.collection.deleteMany(parameter, (err, result) => {
        assert.equal(err, null);
        console.log('Removed file');
        callback(result);
      });
    }

    drop() {
      this.collection.drop();
      return new Promise(resolve => resolve(true));
    }


}
