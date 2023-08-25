
import mongoose from "mongoose";

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
    }
  })
  
  const Order = mongoose.model("orders", ordersSchema)
  
  export default Order