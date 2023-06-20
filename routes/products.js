const { getAllProducts, createProduct } = require("../db/adapters/products");

const productsRouter = require("express").Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const { name, price, description, sport_id } = req.body;
    const newProduct = await createProduct({
      name,
      price,
      description,
      sport_id,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
