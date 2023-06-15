const orderProductsRouter = require('express').Router();
const {authRequired} = require('./authRoute');
const {addProductToOrder,getOrderProductsById,getOrderProductsByOrder,updateOrderProducts,destroyOrderProducts} = require('../db/adapters/order_products');
//const {getOrderById} = require('../db/adapters/orders');
