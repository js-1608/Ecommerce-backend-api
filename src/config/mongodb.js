import { MongoClient } from "mongodb";
import dotenv from "dotenv";


dotenv.config();
const url = process.env.DB_URL;
let client
export const connectTOMongoDB = () => {
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance
            console.log("DB is Connected");
            // calling counter and index metod
            createCounter(client.db());
            createIndex(client.db())
        })
        .catch(err => {
            console.log(err);
        })
}

export const getDb = () => {
    return client.db()
}

export const getClient = () => {
    return client
}

const createCounter = async (db) => {
    const existingCounter = await db.collection("counters").findOne({ _id: 'cartItemId' });
    if (!existingCounter) {
        await db.collection("counters").insertOne({ _id: 'cartItemId', value: 0 })
    }
}

const createIndex = async (db) => {
    try {
        await db.collection("products").createIndex({ price: 1 });
        await db.collection("products").createIndex({ price: 1, categoty: -1 });
        await db.collection("products").createIndex({ name: "text" });

    } catch (err) {
        console.log(err);
    }
}
