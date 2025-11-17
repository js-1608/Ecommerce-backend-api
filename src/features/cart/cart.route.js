// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import CartitemController from './cart.controller.js';
// 2. Initialize Express router.
const cartRouter = express.Router();
const cartitemController = new CartitemController();

// All the paths to the controller methods.
// localhost/api/cart 

cartRouter.delete(
    '/:id',
    (req, res) => {
        cartitemController.delete(req, res)
    }
);
cartRouter.post(
    '/add',
    (req, res) => {
        cartitemController.add(req, res)
    }
);

// cartRouter.get(
//     '/',
//     cartitemController.cart
// );

cartRouter.get(
    '/',
    (req,res)=>{
        cartitemController.cart(req,res);
    }
);


export default cartRouter;