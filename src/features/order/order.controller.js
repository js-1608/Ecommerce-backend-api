import OrderRepository from "./order.repository.js"


export default class OrderController{
    constructor()
    {
        this.orederRepository=new OrderRepository()
    }
    async placeOrder(req,res,next)
    {
        try{    
            const userId=req.userId;
            await this.orederRepository.placeOrder(userId);
            res.status(201).send("order is created");

        }catch(err)
        {
            console.log(err);
        }
    }
}