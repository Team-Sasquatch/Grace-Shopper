const {
  getAllProducts,
  createProduct,
  getProductById,
  getProductsByUser,
} = require("../db/adapters/products");

const productsRouter = require("express").Router();

//get all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//create new product
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

//get product by ID
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const productById = await getProductById(req.params.id);
    res.send(productById);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:username/products", async (req, res, next) => {
  try {
    const username = req.params.username;
    const productByUser = await getProductsByUser(username);
    res.send({ productByUser });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
