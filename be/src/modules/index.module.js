const express = require("express");
const articlesRouter = require("./articles.module");
const productsRouter = require("./products.module");

const router = express.Router();

router.use("/articles", articlesRouter);
router.use("/items", productsRouter);

module.exports = router;
