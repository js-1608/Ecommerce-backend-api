import cartItemModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";


export default class CartitemController {

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async add(req, res) {
        try {
            let { productId, quantity } = req.query;
            quantity = parseInt(quantity, 10)
            const userId = req.userId;
            // const cartItem = new cartItemModel(productId, userId, quantity);

            await this.cartRepository.add(productId, userId, quantity)

            res.status(201).send("Cart is Updated");
        } catch (err) {
            console.log(err);
        }
    }

    async cart(req, res) {

        try {
            const userId = req.userId;
            const items = await this.cartRepository.getCart(userId);
            return res.send(items);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(req, res) {
        const cartId = req.params.id;
        const userId = req.userId;
        const isDeleted = await this.cartRepository.delete(cartId, userId)
        console.log(isDeleted);
        if (!isDeleted) {
            return res.status(404).json({ message: "No item found for this user" });
        }

        return res.status(200).json({ message: "Item removed successfully" });

    }
}   