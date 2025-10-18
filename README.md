
# Ecommerce Backend APIs

A brief description of what this project does and who it's for

AUTHENTICATION & USER MANAGEMENT
| No | Method | Endpoint                    | Description                | Restricted   |
| -- | ------ | --------------------------- | -------------------------- | ------------ |
| 1  | `POST` | `/api/auth/register`        | Register a new user        | ❌            |
| 2  | `POST` | `/api/auth/login`           | Login user and get token   | ❌            |
| 3  | `POST` | `/api/auth/logout`          | Logout current user        | ✅ restricted |
| 4  | `GET`  | `/api/auth/profile`         | Get logged-in user profile | ✅ restricted |
| 5  | `PUT`  | `/api/auth/profile`         | Update user profile info   | ✅ restricted |
| 6  | `PUT`  | `/api/auth/change-password` | Change user password       | ✅ restricted |
| 7  | `POST` | `/api/auth/forgot-password` | Send reset password link   | ❌            |
| 8  | `POST` | `/api/auth/reset-password`  | Reset password using token | ❌            |


USER ROLES (ADMIN / CUSTOMER)
| No | Method   | Endpoint              | Description                   | Restricted   |
| -- | -------- | --------------------- | ----------------------------- | ------------ |
| 1  | `GET`    | `/api/users`          | Get all users (Admin only)    | ✅ restricted |
| 2  | `GET`    | `/api/users/:id`      | Get single user details       | ✅ restricted |
| 3  | `PUT`    | `/api/users/:id/role` | Change user role (Admin only) | ✅ restricted |
| 4  | `DELETE` | `/api/users/:id`      | Delete a user (Admin only)    | ✅ restricted |

PRODUCT MANAGEMENT
| No | Method   | Endpoint                           | Description                                       | Restricted   |
| -- | -------- | ---------------------------------- | ------------------------------------------------- | ------------ |
| 1  | `GET`    | `/api/products`                    | Get all products (with filters, pagination, etc.) | ❌            |
| 2  | `GET`    | `/api/products/:id`                | Get single product details                        | ❌            |
| 3  | `POST`   | `/api/products`                    | Create new product (Admin only)                   | ✅ restricted |
| 4  | `PUT`    | `/api/products/:id`                | Update product details (Admin only)               | ✅ restricted |
| 5  | `DELETE` | `/api/products/:id`                | Delete product (Admin only)                       | ✅ restricted |
| 6  | `GET`    | `/api/products/category/:category` | Get products by category                          | ❌            |
| 7  | `GET`    | `/api/products/search?keyword=`    | Search products by name or description            | ❌            |
| 8  | `POST`   | `/api/products/:id/rate`           | Rate a product                                    | ✅ restricted |
| 9  | `GET`    | `/api/products/:id/reviews`        | Get reviews for a product                         | ❌            |
| 10 | `POST`   | `/api/products/:id/reviews`        | Add product review                                | ✅ restricted |


CART MANAGEMENT
| No | Method   | Endpoint                      | Description                     | Restricted   |
| -- | -------- | ----------------------------- | ------------------------------- | ------------ |
| 1  | `GET`    | `/api/cart`                   | Get user’s cart                 | ✅ restricted |
| 2  | `POST`   | `/api/cart/add`               | Add product to cart             | ✅ restricted |
| 3  | `PUT`    | `/api/cart/update/:productId` | Update product quantity in cart | ✅ restricted |
| 4  | `DELETE` | `/api/cart/remove/:productId` | Remove product from cart        | ✅ restricted |
| 5  | `DELETE` | `/api/cart/clear`             | Clear entire cart               | ✅ restricted |


ORDER MANAGEMENT
| No | Method | Endpoint                       | Description                      | Restricted   |
| -- | ------ | ------------------------------ | -------------------------------- | ------------ |
| 1  | `POST` | `/api/orders`                  | Place a new order                | ✅ restricted |
| 2  | `GET`  | `/api/orders`                  | Get all orders of current user   | ✅ restricted |
| 3  | `GET`  | `/api/orders/:id`              | Get order details                | ✅ restricted |
| 4  | `PUT`  | `/api/orders/:id/cancel`       | Cancel an order                  | ✅ restricted |
| 5  | `GET`  | `/api/admin/orders`            | Get all orders (Admin only)      | ✅ restricted |
| 6  | `PUT`  | `/api/admin/orders/:id/status` | Update order status (Admin only) | ✅ restricted |


PAYMENT MANAGEMENT
| No | Method | Endpoint                | Description                         | Restricted   |
| -- | ------ | ----------------------- | ----------------------------------- | ------------ |
| 1  | `POST` | `/api/payment/checkout` | Initiate checkout (Stripe/Razorpay) | ✅ restricted |
| 2  | `POST` | `/api/payment/verify`   | Verify payment after success        | ✅ restricted |
| 3  | `GET`  | `/api/payment/history`  | Get user payment history            | ✅ restricted |


CATEGORY & SUBCATEGORY MANAGEMENT
| No | Method   | Endpoint              | Description                   | Restricted   |
| -- | -------- | --------------------- | ----------------------------- | ------------ |
| 1  | `GET`    | `/api/categories`     | Get all categories            | ❌            |
| 2  | `POST`   | `/api/categories`     | Add new category (Admin only) | ✅ restricted |
| 3  | `PUT`    | `/api/categories/:id` | Update category (Admin only)  | ✅ restricted |
| 4  | `DELETE` | `/api/categories/:id` | Delete category (Admin only)  | ✅ restricted |


WISHLIST MANAGEMENT
| No | Method   | Endpoint                          | Description                  | Restricted   |
| -- | -------- | --------------------------------- | ---------------------------- | ------------ |
| 1  | `GET`    | `/api/wishlist`                   | Get all items in wishlist    | ✅ restricted |
| 2  | `POST`   | `/api/wishlist/add/:productId`    | Add product to wishlist      | ✅ restricted |
| 3  | `DELETE` | `/api/wishlist/remove/:productId` | Remove product from wishlist | ✅ restricted |


COUPONS / DISCOUNTS
| No | Method   | Endpoint             | Description                    | Restricted   |
| -- | -------- | -------------------- | ------------------------------ | ------------ |
| 1  | `GET`    | `/api/coupons`       | Get all active coupons         | ❌            |
| 2  | `POST`   | `/api/coupons`       | Create new coupon (Admin only) | ✅ restricted |
| 3  | `PUT`    | `/api/coupons/:id`   | Update coupon (Admin only)     | ✅ restricted |
| 4  | `DELETE` | `/api/coupons/:id`   | Delete coupon (Admin only)     | ✅ restricted |
| 5  | `POST`   | `/api/coupons/apply` | Apply coupon to user cart      | ✅ restricted |


DASHBOARD (Admin Analytics)
| No | Method | Endpoint                  | Description                            | Restricted   |
| -- | ------ | ------------------------- | -------------------------------------- | ------------ |
| 1  | `GET`  | `/api/admin/stats`        | Get overall sales, orders, users stats | ✅ restricted |
| 2  | `GET`  | `/api/admin/sales-report` | Get sales report by date range         | ✅ restricted |


INVENTORY MANAGEMENT (Optional Advanced)
| No | Method | Endpoint                          | Description                 | Restricted   |
| -- | ------ | --------------------------------- | --------------------------- | ------------ |
| 1  | `GET`  | `/api/inventory`                  | Get all inventory items     | ✅ restricted |
| 2  | `PUT`  | `/api/inventory/:productId/stock` | Update stock count          | ✅ restricted |
| 3  | `GET`  | `/api/inventory/low-stock`        | Get products with low stock | ✅ restricted |


SHIPPING & ADDRESS MANAGEMENT
| No | Method   | Endpoint           | Description             | Restricted   |
| -- | -------- | ------------------ | ----------------------- | ------------ |
| 1  | `GET`    | `/api/address`     | Get all saved addresses | ✅ restricted |
| 2  | `POST`   | `/api/address`     | Add a new address       | ✅ restricted |
| 3  | `PUT`    | `/api/address/:id` | Update an address       | ✅ restricted |
| 4  | `DELETE` | `/api/address/:id` | Delete an address       | ✅ restricted |
