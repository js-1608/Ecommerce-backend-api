import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/ApplicationError.js";

class userRepository {
    async signUp(newUser) {
        try {
            // 1.connect with database
            const db = getDb();
            // 2 get the collection
            const collection = db.collection("users");

            // 3. insert the document
            await collection.insertOne(newUser)
            return newUser
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong at usermodel signup", 500)
        }

    }


    async findByEmail(email) {
        try {
            // 1.connect with database
            const db = getDb();
            // 2 get the collection
            const collection = db.collection("users");

            // 3. find the document
            return await collection.findOne({email})
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong at usermodel signup", 500)
        }

    }


   async signIn(email,password) {
        try {
            // 1.connect with database
            const db = getDb();
            // 2 get the collection
            const collection = db.collection("users");

            // 3. find the document
            return await collection.findOne({email,password})
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong at usermodel signup", 500)
        }

    }
}

export default userRepository;