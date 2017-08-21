import { MongoClient } from 'mongodb';
import * as assert from 'assert';


export class MongoCollection {
    private collection;
    constructor (private url: string, collectionName ) {
      MongoClient.connect(this.url).then((db) => {
        this.collection = db.collection(collectionName);
        console.log('Connected successfully to server');
      });
    }

    async insertElements(data) {
      const result = await this.collection.insert(data);
      console.log(`Inserted ${data.length} documents into the collection`);
      return new Promise ((resolve) => resolve(result));
    }

    async showElements( sortParam?, limitParam?: number) {
      const result = await this.collection.find({}).sort(sortParam ? sortParam : { lastName: 1, firstName: 1}).limit(limitParam ? limitParam : 0).toArray();
      return new Promise(resolve => resolve(result));
    }

    async findElement(parameter, sortParam?, limitParam?: number) {
      const result = await this.collection.find(parameter).sort(sortParam ? sortParam : { lastName: 1, firstName: 1}).limit(limitParam ? limitParam : 0).toArray();
      return new Promise(resolve => resolve(result));
    }

    async updateElement(parameter) {
      const result = await this.collection.updateOne({login: parameter.login}, { $set: parameter });
      return new Promise(resolve => resolve(result));
    }

    async updateAllElements(parameter) {
      const result = await this.collection.updateMany({login: parameter.login}, { $set: parameter });
      return new Promise(resolve => resolve(result));
    }

    async removeElement(parameter) {
      const result = await this.collection.deleteOne({login: parameter.login});
      return new Promise(resolve => resolve(result));
    }

    async removeAllElements(parameter) {
      const result = await this.collection.deleteMany(parameter);
      return new Promise(resolve => resolve(result));
    }

    drop() {
      this.collection.drop();
      return new Promise(resolve => resolve(true));
    }


}
