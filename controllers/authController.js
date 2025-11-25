const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtToken");
const user = require("../models/user");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).send("Error hashing password");
        } else {
          const user = await userModel.create({
            fullName,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("userToken", token);
          res.send("user registered successfully");
        }
      });
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    let token = generateToken(user);
    res.cookie("userToken", token);
    res.send("User logged in successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.logoutUser = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
};  