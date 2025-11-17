// 1. Import express
import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middelware.js';
import basicAuth from './src/middlewares/basic.auth.middelware.js';
import cartRouter from './src/features/cart/cart.route.js';
// swagger ui import
import swagger from 'swagger-ui-express';
import apiDocs from "./swagger.json" assert {type: 'json'}
import cors from 'cors';
import loggermiddlware from './src/middlewares/logger.middelware.js';
import { ApplicationError } from './src/error-handler/ApplicationError.js';
import { connectTOMongoDB } from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.route.js';




// 2. Create Server
const server = express();

// solving cors error
// server.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
//     // return OK for preflight
//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200)
//     }
//     next();

// });
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(cors());
server.use(loggermiddlware)
server.use(express.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
// server.use("/api/products",basicAuth, productRouter);

// path for swagger ui
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs))

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cart", jwtAuth, cartRouter)
server.use("/api/orders", jwtAuth, orderRouter)
// error handler midelware
server.use((err, req, res, next) => {
    console.log(err);

    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    // servr errors
    res.status(500).send("Some thing went wrong")
})

// 3. handling 404 request
server.use((req, res) => {
    res.status(404).send("API not found")
})

// 4. Default request handler
server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce APIs");
});


// 4. Specify port.
server.listen(3200, () => {
    connectTOMongoDB()
    console.log("Server is running at 3200");
});

