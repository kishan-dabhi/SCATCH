const express = require("express");
const router = express.Router();
const isLogIn = require("../middlewares/isLogIn");
const { logoutUser } = require("../controllers/authController");
const productModel = require("../models/product");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLogIn, async (req, res) => {
  const products = await productModel.find();
  res.render("shop", { products });
});

module.exports = router;
