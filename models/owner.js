const mongoose = require("mongoose");
const product = require("./product");

const ownerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  products: {
    type: Array,
    default: [],
  },
  picture: {
    type: String,
    default: null,
  },
  gstin: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("owner", ownerSchema);
