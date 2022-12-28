import { MongoClient } from 'mongodb';
import { hostMongo, portMongo, usernameMongo, passwordMongo, databaseMongo} from '../config/config.js';

const uri = `mongodb://${hostMongo}:${portMongo}`;

export const mongoClient = new MongoClient(uri, {
    authSource: "admin",
    auth: {
        username: usernameMongo,
        password: passwordMongo,
    }
})

await mongoClient.connect();

export const mongoDatabase = mongoClient.db(databaseMongo)