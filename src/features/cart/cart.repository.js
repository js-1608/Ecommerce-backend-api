import { ObjectId, ReturnDocument } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/ApplicationError.js";


class CartRepository {

    constructor() {
        this.collection = "cart"
    }

    async add(productId, userId, quantity) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const id=await this.getNextCounter(db)
            await collection.updateOne(
                {productId:new ObjectId(productId),userId:new ObjectId(userId)},
                {
                    $setOnInsert:{_id:id},
                    $inc:{quantity:quantity}
                },
                {upsert:true}
            );
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)
        }
    }

    async getCart(userId) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const items = await collection.find({ userId:new ObjectId(userId) }).toArray();
            return items

        } catch (err) {
            console.log(err);
        }
    }


    async delete(cartId, userId) {
        const db = getDb();
        const collection = db.collection(this.collection);

        const result = await collection.deleteOne({
            _id: new ObjectId(cartId),
            userId:new ObjectId(userId)
        });

        return result.deletedCount > 0;
    }

    async getNextCounter(db) {
    const resultDocument = await db.collection("counters").findOneAndUpdate(
        { _id: 'cartItemId' },
        { $inc: { value: 1 } },
        { returnDocument: 'after', upsert: true }
    );

    console.log(resultDocument)
    if (!resultDocument.value) {
        throw new Error("Counter document not found or failed to update.");
    }

    return resultDocument.value;
}


}

export default CartRepository