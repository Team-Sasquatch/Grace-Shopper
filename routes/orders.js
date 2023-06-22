const express = require('express');
const ordersRouter = express.Router();
const {
    getAllOrders,
    getOrderById,
    createOrder,
    getAllOrdersByUserId,
    getOrdersByStatus,
    updateOrderStatus
} = require("../db/adapters/orders");

// GET /orders - Get all orders
ordersRouter.get('/', async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.json({
            success: true,
            message: "Orders Found",
            data: allOrders
        });
    } catch (error) {
        next(error)
    }
});

// GET /orders/:id - Get a specific order by ID
ordersRouter.get('/:id', async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = await getOrderById(orderId);

        if (order) {
            res.json({ success: true, data: order, message: 'Found Order' });
        } else {
            res.status(404).json({ message: 'Order not found', success: false });
        }
    } catch (error) {
        next(error)
    }
});

// GET /orders/:id - Get a specific order by user ID
ordersRouter.get('/user/:id', async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const orders = await getAllOrdersByUserId(userId);

        if (orders) {
            res.send({ success: true, orders, message: 'Found Order' });
        } else {
            res.status(404).json({ message: 'Order not found', success: false });
        }
    } catch (error) {
        next(error)
    }
});


//---------------------------------------------------------Not working-------------------
// GET /orders/:id - Get orders by status
ordersRouter.get('/status/:status', async (req, res, next) => {
    try {
        const status = req.params;
        const orders = await getOrdersByStatus(status);

        if (orders) {
            res.send({ success: true, orders, message: 'Found Order' });
        } else {
            res.status(404).json({ message: 'Order not found', success: false });
        }
    } catch (error) {
        next(error)
    }
});


// POST /orders - Create a new order
ordersRouter.post('/', async (req, res, next) => {
    try {
        const { user_id, cost, order_number, status } = req.body;
        // Assuming the request body contains the necessary order information

        const createdOrder = await createOrder({ user_id, cost, order_number, status })

        res.status(201).json({
            success: true,
            message: 'Created Order',
            data: createdOrder
        });
    } catch (error) {
        next(error)
    }
});

// PUT /orders/:id - Update an existing order
ordersRouter.patch('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { user_id, cost, status } = req.body;
        // Assuming the request body contains the updated order information

        const updatedOrder = await updateOrderStatus({ id, user_id, cost, status });
        if (updatedOrder) {
            res.json({
                data: updatedOrder,
                success: true,
                message: 'Order Updated'
            });
        } else {
            res.status(404).json({ message: 'Order not found', success: false });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = ordersRouter;