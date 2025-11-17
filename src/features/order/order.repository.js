import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../config/mongodb.js";
import OrderModal from "./order.modal.js";

export default class OrderRepository {
    constructor() {
        this.collection = "orders";
    }
    async placeOrder(userId) {
        const client = getClient();
        const session = client.startSession();
        try {
            const db = getDb();
            session.startTransaction();
            const collection = db.collection(this.collection);


            // 1.get cart item calculate total
            const items = await this.getTotalAmount(userId, session);

            const finalTotal = items.reduce((acc, item) => acc + item.totalAmount, 0)
            console.log(finalTotal);


            // 2 create an order record
            const newOrder = new OrderModal(userId, finalTotal, new Date());
            await collection.insertOne(newOrder, { session });

            // 3 reduce the stock 
            for (let item of items) {
                await db.collection("products").updateOne(
                    { _id: items.productID },
                    { $inc: { stock: -item.quantity } }
                    , { session }
                )
            }

            // 4 clear cart item
            await db.collection("cart").deleteMany({
                userId: new ObjectId(userId)
            }, { session })


            session.commitTransaction()
            session.endSession()
            return



        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.log(err)
        }
    }

    async getTotalAmount(userId, session) {
        console.log(userId)
        const db = getDb();
        const items = await db.collection("cart").aggregate([
            // 1. GET THE CARTITEM for user
            {
                $match: { userId: new ObjectId(userId) }
            },
            // 2 get the product from product collection 
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // 3 unwind the product info
            {
                $unwind: "$productInfo"
            },
            // 4. calculate total amount
            {
                $addFields: {
                    "totalAmount": {
                        $multiply: [
                            "$productInfo.price", "$quantity"
                        ]
                    }
                }
            }
        ], { session }).toArray();

        return items;

    }
}