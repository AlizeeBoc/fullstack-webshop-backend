import { Decimal128 } from "mongodb"
import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
  quantity: {
   type: integer,
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
    type: mongoose.Schema.Types.price,
    ref: 'products',
   }]
})

const Cart = mongoose.model("carts", cartsSchema)

export default Cart
