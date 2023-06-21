const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

const productsRouter = require("./products");
router.use("/products", productsRouter);

const orderProductsRouter = require("./order_products");
router.use("/orderproducts", orderProductsRouter);

const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

const sportsRouter = require("./sports");
router.use("/sports", sportsRouter);

const usersRouter = require("./users");
router.use("/users", usersRouter);

module.exports = router;
