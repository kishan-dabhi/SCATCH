const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
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

  cart: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
  orders: {
    type: [
      {
        orderId: { type: String },
        items: Array,
        totalAmount: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },

  contact: {
    type: Number,
    required: false,
  },

  picture: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("user", userSchema);
