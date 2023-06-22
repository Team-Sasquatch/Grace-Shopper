const orderProductsRouter = require('express').Router();
const {authRequired} = require('./authRoute');
const {addProductToOrder,getOrderProductsById,getOrderProductsByOrder,updateOrderProducts,destroyOrderProducts} = require('../db/adapters/order_products');
const {getOrderById} = require('../db/adapters/orders');

orderProductsRouter.post('/',async(req,res,next)=>{
    try {
        const {order_id,product_id,quantity} = req.body;
        const order = await getOrderById(order_id);
        let duplicate = false;
        if (typeof order.products !== 'undefined')
            if (order.products.length > 0){
                for (let i=0;i<order.products.length;i++){
                    if (order_id === order.id && product_id === order.products[i].id){
                        duplicate = true;
                    }
                    break;
                }
            }
        if (duplicate === false){
            const orderProduct = await addProductToOrder({order_id,product_id,quantity});
            res.send({
                orderProduct
            });
        }
        else{
            next({
                name: 'DuplicateOrderPorductError',
                message: 'Order Id and Product Id pair already matches in the system'
            });
        }
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.patch('/:orderProductId',authRequired,async(req,res,next)=>{
    try {
        const {orderProductId} = req.params;
        const {quantity} = req.body;
        const orderProduct = await getOrderProductsById(orderProductId);
        const order = await getOrderById(orderProduct.order_id);
        if (req.user.id === order.user_id){
            if (!orderProduct){
                next({
                    name: "IdNotFoundError",
                    message: "Order Product ID was not found"
                })
            }
            else{
                const updatedOrderProduct = await updateOrderProducts(orderProductId,quantity);
                res.send({
                    message: "Updating Routine Activity is Successful",
                    updatedOrderProduct
                })
            }
        }
        else{
            next({
                name: "IdMatchError",
                message: "User Id does not match the Order's User Id"
            })
        }
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.delete('/:orderProductId',authRequired,async(req,res,next)=>{
    const {orderProductId} = req.params;
    const orderProduct = await getOrderProductsById(orderProductId);
    const order = await getOrderById(orderProduct.order_id);
    if (req.user.id === order.user_id){
        if (!orderProduct){
            next({
                name: 'IdNotFoundError',
                message: 'Order Product ID was not found'
            })
        }
        else{
            const destroyedOrderProduct = await destroyOrderProducts(orderProductId);
            res.send({
                message: 'Destroying Order Product is Successful',
                destroyedOrderProduct
            })
        }
    }
    else{
        next({
            name: "IdMatchError",
            message: "User Id does not match the Order's User Id"
        })
    }
})

module.exports = orderProductsRouter;