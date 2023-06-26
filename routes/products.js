const {
  getAllProducts,
  createProduct,
  getProductById,
  getProductsByUser,
  updateProduct,
  getProductByCategory,
} = require("../db/adapters/products");
const { authRequired } = require("./authRoute");

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

productsRouter.get("/category/:category", async (req, res, next) => {
  try {
    const productCat = await getProductByCategory(req.params.category);
    res.send(productCat);
  } catch (error) {
    next(error);
  }
});

//create new product
productsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { name, sport_id, price, description, category, flavor } = req.body;
    if (req.user.is_admin) {
      const newProduct = await createProduct({
        name,
        sport_id,
        price,
        description,
        category,
        flavor,
      });
      res.send(newProduct);
    } else {
      next({
        name: "UserNotAdminError",
        message: "The user is not an admin and cannot perform this task",
      });
    }
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

productsRouter.patch("/:id", authRequired, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (req.user.is_admin) {
      const { name, sport_id, price, description, category, flavor } = req.body;
      const updatedProd = await updateProduct({
        id,
        sport_id,
        name,
        price,
        description,
        category,
        flavor,
      });
      if (updatedProd) {
        res.send(updatedProd);
      } else {
        res.status(404).json({ message: "Product not found", success: false });
      }
    } else {
      next({
        name: "UserNotAdminError",
        message: "The user is not an admin and cannot perform this task",
      });
    }
  } catch (error) {
    next(error);
  }
});

//Commented out since it's not needed
// productsRouter.get("/:username/products", async (req, res, next) => {
//   try {
//     const username = req.params.username;
//     const productByUser = await getProductsByUser(username);
//     res.send({ productByUser });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = productsRouter;
