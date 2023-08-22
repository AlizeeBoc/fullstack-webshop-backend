import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
  quantity: {
   type: integer,
   required: true,
  },
  
  chest: {
    type: float,
    required: true,
   },
   waist: {
    type: float,
    required: true,
   },
   hips: {
    type: float,
    required: true,
   },
   price: [{
    type: mongoose.Schema.Types.price,
    ref: 'products',
   }]
})

const Cart = mongoose.model("carts", cartsSchema)

export default Cart
