const express = require("express");
const router = express.Router();
const isLogIn = require("../middlewares/isLogIn");
const productModel = require("../models/product");
const userModel = require("../models/user");
const user = require("../models/user");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLogIn, async (req, res) => {
  const products = await productModel.find();
  let success = req.flash("success");

  res.render("shop", {
    products,
    success: success.length ? success[0] : null,
  });
});

router.get("/cart", isLogIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.render("cart", { user });
  console.log(user);
  
});

router.get("/addtocart/:id", isLogIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push({ productId: req.params.id, quantity: 1 });
  await user.save();
  req.flash("success", "Product added to cart successfully");
  res.redirect("/shop");
});

module.exports = router;
