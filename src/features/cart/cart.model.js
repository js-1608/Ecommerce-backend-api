let id = 0;
export default class cartItemModel {
    constructor(productId, userId, quantity,id) {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this._id = id;
    }

    // static addProduct(productId, userId, quantity) {
    //     const cartitem = new cartItemModel(productId, userId, quantity);
    //     cartitems.push(cartitem);
    //     return cartitem;
    // }

    // static getCart(userId) {

    //     const userProducts = cartitems.filter(u => u.userId == userId);
    //     const productList = userProducts.map((item) => {
    //         return {
    //             productId: item.productId,
    //             quantity: item.quantity,
    //             id:item.id
    //         }
    //     });

    //     console.log(productList);
    //     return productList;
    // }

    // static deleteCartItem(userId,id) {



    //     const cartitemIndex = cartitems.findIndex(u => u.id == id && u.userId==userId);

    //     if (cartitemIndex == -1) {
    //         return "no Item Found in cart";
    //     } else {
    //         cartitems.splice(cartitemIndex, 1)
    //     }
    // }
}

let cartitems = [
    new cartItemModel(1, 1, 1)
]