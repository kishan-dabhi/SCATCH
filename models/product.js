const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    bgColor: {
      type: String,
      default: "#ffffff",
    },

    panelColor: {
      type: String,
      default: "#f1f1f1",
    },

    textColor: {
      type: String,
      default: "#000000",
    },
  },
  {
    timestamps: true,
  }
);

// Index for search performance
productSchema.index({ name: 1 });

module.exports = mongoose.model("product", productSchema);
