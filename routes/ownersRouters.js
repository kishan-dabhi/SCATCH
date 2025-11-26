const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(400).send("Owner already exists");
    }
    let { fullName, email, password, gstin } = req.body;
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
      gstin,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
