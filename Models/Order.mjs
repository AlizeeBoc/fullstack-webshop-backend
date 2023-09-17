import mongoose from 'mongoose';
import Product from "../Models/Product.mjs"

const { Schema, Decimal128 } = mongoose;

const ordersSchema = new Schema({
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
  status: String,
  items: [
    {
      product: {
      type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      chest: Number,
      waist: Number,
      hips: Number,
      price: {
        type: Decimal128,
        required: true,
      },
      totalPrice: {
        type: Decimal128,
        required: true,
      },
    },
  ],
  //shippingFee: {
  //  type: Number,
  //  default: 15,
  //},
  ////total
});

const Order = mongoose.model('orders', ordersSchema);

export default Order;
