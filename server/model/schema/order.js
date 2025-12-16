const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    stdId: {
      type: String,
    },
    studentName: {
      type: String,
    },
    amount: {
      type: Number,
    },
    pages: {
      type: Number,
    },
    copies: {
      type: Number,
    },
    printType: {
      type: String,
    },
    sides: {
      type: String,
    },
    lunchTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    file: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      fileType: {
        type: String, // image / pdf / doc
      },
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema, "Order");

module.exports = Order;
