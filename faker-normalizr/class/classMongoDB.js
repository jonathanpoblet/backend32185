import { mongoDatabase } from "../clients/mongoClient.js";

export class ClassMongoDB {
    constructor(collection) {
        this.collection = mongoDatabase.collection(collection);
    }

    async getAll(term = {}) {
        try {
            const item = await this.collection.find(term).toArray();
            return item;
        } catch (error) {
            throw new Error("No item found: " + error);
        }
    }

    async getById(id) {
        try {
            const operation = {identificator: id};
            const itemFound = await this.collection.find(operation).toArray();
            return itemFound[0];
        } catch (error) {
            throw new Error("Item with identificator: " + id + "not found. Error: " + error);
        }    
    }

    async save(item) {
        try {
            await this.collection.insertOne(item);
        } catch (error) {
            throw new Error("No item save: " + error);
        }
    }

    async changeById(id,body) {
        try {
            const operation = {identificator: id};
            const change = body;
            const set = {"$set" : change};
            await this.collection.updateOne(operation,set);
        } catch (error) {
            throw new Error("No item changed: " + error);
        }
    }

    async deleteById(id) {
        try {
            const operation = {identificator: id};
            await this.collection.deleteOne(operation);
        } catch (error) {
            throw new Error("Can not delete item: " + " with id: "+ id + error);
        }
    }
}