const cartRouter = require('express').Router();
const { clearCart, addToCart, getCartForUser } = require('../db/adapters/cart');
const jwt = require("jsonwebtoken");

cartRouter.get('/', async (req, res, next) => {
    try {
        const token = req.signedCookies.token;
        let user = jwt.verify(token,process.env.JWT_SECRET);
        const cart = await getCartForUser(user.id);
        res.json({
            success: true,
            message: "Cart Found",
            data: JSON.stringify(cart.cart || [])
        });
    } catch (error) {
        next(error)
    }
});

cartRouter.delete('/', async (req, res, next) => {
    try {
        const token = req.signedCookies.token;
        let user = jwt.verify(token,process.env.JWT_SECRET);
        const cart = await clearCart(user.id);
        res.json({
            success: true,
            message: "Cart Found",
            data: cart
        });
    } catch (error) {
        next(error)
    }
});

cartRouter.post('/', async (req, res, next) => {
    try {
        const token = req.signedCookies.token;
        let user = jwt.verify(token,process.env.JWT_SECRET);
        const { cart } = req.body;
        const data = await addToCart({userId: user.id, cartJson: cart});
        res.json({
            success: true,
            message: "Cart Found",
            data: data
        });
    } catch (error) {
        next(error)
    }
});

module.exports = cartRouter;