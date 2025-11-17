import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository()
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAll();
            console.log(products)
            res.status(200).send(products);
        } catch (err) {
            console.log(err)
        }
    }

    async addProduct(req, res) {
        try {
            const { name, price, sizes } = req.body;
            const newProduct = {
                name,
                price: parseFloat(price),
                sizes: sizes.split(','),
                imageUrl: req.file.filename,
            };
            const product = new ProductModel(name, parseFloat(price), sizes.split(','), req.file.filename);
            const data = await this.productRepository.add(product);
            res.status(201).send(data);
        } catch (err) {
            console.log(err);
        }
    }

    async getOneProduct(req, res) {

        try {
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if (!product) {
                res.status(404).send("product not found");
            } else {
                return res.status(200).send(product);
            }
        } catch (err) {
            console.log(err)
        }
    }

    async filterProduct(req, res) {
        try {
            const minPrice = parseFloat(req.query.minPrice);
            const maxPrice = parseFloat(req.query.maxPrice);
            const category = req.query.category;
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            res.status(200).send(result);
        } catch (err) {
            console.log(err)
        }
    }

    // async filterProducts(req, res) {
    //     try {
    //         const minPrice = req.query.minPrice;
    //         const maxPrice = req.query.maxPrice;
    //         const categories = req.query.categories;
    //         const result = await this.productRepository.filter(
    //             minPrice,
    //             categories
    //         );
    //         res.status(200).send(result);
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(200).send("Something went wrong");
    //     }
    // }

    async rateProduct(req, res) {
        const userId = req.userId;
        const productId = req.body.productId;
        const rating = req.body.rating;

        try {
            await this.productRepository.rateProduct(userId, productId, rating);
            return res.status(200).send("SUCCESSFULLY ADDED");
        } catch (err) {
            console.log("err0r")
            return res.status(400).send(err.message)
        }
    }

    async averagePrice(req,res,next)
    {
        try{
            const result=await this.productRepository.getAvgPriceProductPerCategory();
            return res.status(200).send(result);

        }catch(err)
        {
            console.log(err);
            return res.status(400).send("something went wrong");
        }
    }
}