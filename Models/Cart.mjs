import { Decimal128 } from "mongodb"
import mongoose from "mongoose"
import Product from "./Product.mjs"

const cartsSchema = new mongoose.Schema({
  quantity: {
   type: Number,
   required: true,
  },
  
  chest: {
    type: Decimal128,
    required: true,
   },
   waist: {
    type: Decimal128,
    required: true,
   },
   hips: {
    type: Decimal128,
    required: true,
   },
   price: [{
    type: Number,
    ref: Product,
   }],
  image: [{
    type: String,
    ref: Product,
   }]
})

const Cart = mongoose.model("carts", cartsSchema)

export default Cart
