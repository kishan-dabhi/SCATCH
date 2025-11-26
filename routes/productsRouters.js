const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully!");
    return res.redirect("/owners/admin");
  } catch (err) {
    req.flash("error", "Error creating product: " + err.message);
    return res.redirect("/owners/admin");
  }
});

module.exports = router;
