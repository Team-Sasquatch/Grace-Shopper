const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

const productsRouter = require("./products");
router.use("/products", productsRouter);

module.exports = router;
