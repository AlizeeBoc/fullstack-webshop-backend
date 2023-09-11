import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  reference: String,
  quantity: Number,
  waist: Number,
  chest: Number,
  hips: Number,
  price: Number,
  image: String,
});

const ordersSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shippingFee: {
    type: Number,
    default: 15,
  },
  total: {
    type: Decimal128,
    required: true,
  },
  items: [orderItemSchema], // Embed orderItemSchema as an array
});

const Order = mongoose.model("orders", ordersSchema);

export default Order;
