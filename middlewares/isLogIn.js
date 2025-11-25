const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    res.flash("error", "You must be logged in to access this page.");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).send("User not found.");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
};
