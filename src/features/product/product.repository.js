import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/ApplicationError.js";

class ProductRepository {
    constructor() {
        this.collection = "products";
    }

    async add(newProduct) {
        try {
            // 1)connect with db
            const db = getDb();
            // 2)connect with collection
            const collection = db.collection(this.collection);
            // adding to product table
            collection.insertOne(newProduct);
            return newProduct
        } catch (err) {
            console.log(err);
            throw new ApplicationError(err, 500)
        }
    }

    async getAll() {
        try {
            // 1)connect with db
            const db = getDb();
            // 2)connect with collection
            const collection = db.collection(this.collection);
            // find all product 
            const allProducts = await collection.find().toArray();
            return allProducts
        } catch (err) {
            console.log(err);
            throw new ApplicationError(err, 500)
        }
    }

    async get(id) {
        try {
            // 1)connect with db
            const db = getDb();
            // 2)connect with collection
            const collection = db.collection(this.collection);
            // 3)find the product
            const product = await collection.findOne({ _id: new ObjectId(id) });
            // 4) Return the result
            return product;
        } catch (err) {
            console.log(err);
            throw new ApplicationError(err, 500)
        }
    }

    async filter(minPrice, maxPrice, category) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            let filterExp = {};

            if (minPrice) {
                console.log(minPrice)
                filterExp.price = { $gte: parseFloat(minPrice) }
            }
            if (maxPrice) {
                // console.log(maxPrice)
                filterExp.price = { ...filterExp.price, $lte: parseFloat(maxPrice) }
            }
            if (category) {
                filterExp.category = category
            }

            return collection.find(filterExp).toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError(err, 500)
        }
    }

    //  async filter(minPrice, categories){
    //         try{
    //             const db = getDB();
    //             const collection = db.collection(this.collection); 
    //             let filterExpression={};
    //             if(minPrice){
    //                 filterExpression.price = {$gte: parseFloat(minPrice)}
    //             }
    //             // ['Cat1', 'Cat2']
    //             categories = JSON.parse(categories.replace(/'/g, '"'));
    //             console.log(categories);
    //             if(categories){
    //                 filterExpression={$or:[{category:{$in:categories}} , filterExpression]}
    //                 // filterExpression.category=category
    //             }
    //             return collection.find(filterExpression).project({name:1, price:1, _id:0, ratings:{$slice:-1}}).toArray();

    //         }catch(err){
    //             console.log(err);
    //             throw new ApplicationError("Something went wrong with database", 500);    
    //         }
    //     }



    // async rateProduct(userId, productId, rating) {

    //     try {
    //         const db = getDb();
    //         const collection = db.collection(this.collection);

    //         // find the product
    //         const product = await collection.findOne({ _id: new ObjectId(productId) })
    //         // there is rating or not
    //         const userRating = product?.ratings?.find(r => r.userId == userId);
    //         if (userRating) {
    //             // update the rating
    //             await collection.updateOne({
    //                 _id: new ObjectId(productId), "ratings.userId": userId
    //             }, {
    //                 $set: {
    //                     "ratings.$.rating": rating
    //                 }
    //             })


    //         } else {
    //             await collection.updateOne(
    //                 { _id: new ObjectId(productId) },
    //                 { $push: { ratings: { userId, rating } } }
    //             )
    //         }

    //     } catch (err) {
    //         console.log(err);
    //         throw new ApplicationError(err, 500)
    //     }

    // }



    async rateProduct(userId, productId, rating) {

        try {
            const db = getDb();
            const collection = db.collection(this.collection);

            // Remove existing rating for this user (if any)
            await collection.updateOne(
                { _id: new ObjectId(productId) },
                { $pull: { ratings: { userId } } }
            );

            // Add new rating
            await collection.updateOne(
                { _id: new ObjectId(productId) },
                { $push: { ratings: { userId, rating } } }
            );


        } catch (err) {
            console.log(err);
            throw new ApplicationError(err, 500)
        }

    }

    async getAvgPriceProductPerCategory() {
        const db = getDb();
        const collection = db.collection(this.collection);

        const result = await collection.aggregate([
            {
                // stage 1 Get Avg price /cat
                $group: {
                    _id: "$category",
                    averagePrice: { $avg: "$price" }
                }
            }
        ]).toArray();
        return result
    }

    async getAvgProductRating() {
        const db = getDb();
        const collection = db.collection(this.collection);

        const result = await collection.aggregate([
            {
                $unwind: "$ratings"
            },
            {
                $group:
                {
                    _id: "$_id",
                    name: "$name",
                    averageRating: { $avg: "$ratings.rating" }
                }
            }
        ]).toArray();
        return result
    }

    async getCountOFRatings() {
        const db = getDb();
        const collection = db.collection(this.collection);

        const result = await collection.aggregate([
            {
                $project: {
                    name: 1,
                    countOfRating: {
                        $cond: { if: { $isArray: "$ratings" }, then: { size: "$ratings" }, else: 0 }
                    }

                }
            },{
                $sort:{countOfRating:-1}
            },{
                $limit:-1
            }
        ])
        return result;
    }

}

export default ProductRepository;