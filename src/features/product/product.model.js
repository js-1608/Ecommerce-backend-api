import { ApplicationError } from "../../error-handler/ApplicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(name, price,sizes, imageUrl, category, desc,id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  // static add(product) {
  //   product.id = products.length + 1;
  //   products.push(product);
  //   return product;
  // }

  // static get(id) {
  //   const product = products.find((i) => i.id == id);
  //   return product;
  // }

  // static getAll() {
  //   return products;
  // }

  // static filter(minPrice, maxPrice, category) {
  //   // console.log("model")
  //   const product = products.filter((i) =>
  //     i.price >= minPrice || i.price <= maxPrice || i.category == category
  //   );
  //   return product;
  // }


  static rateProduct(userId, productId, rating) {
  console.log(userId);

  const user = UserModel.getAll().find(u => u.id === userId);

  if (!user) {
    throw new ApplicationError("User not found",404);
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new ApplicationError("Product not found",400);
  }

  if (!product.ratings) {
    product.ratings = [];
  }

  const existingRatingIndex = product.ratings.findIndex(r => r.userId === userId);

  if (existingRatingIndex >= 0) {
    product.ratings[existingRatingIndex] = { userId, rating };
  } else {
    product.ratings.push({ userId, rating });
  }

  return product;
}

}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Cateogory1'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    28.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Cateogory2',
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Cateogory3',
    ['M', 'XL', 'S']
  )];