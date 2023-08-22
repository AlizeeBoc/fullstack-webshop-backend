
import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    reference: {
     type: String,
     required: true,
    },
    description: {
     type: String,
     required: true,
    },
    price: {
     type: Float,
     required: true,
    },
    image: {
      type: String,
      required: true,
    }
    //overallRating: {
    //  type: String,
    //  required: true,
    //},
    //playerImg : {
    //  type : String,
    //  //required : true
    //},
    //clubImg : {
    //  type : String,
    //  //required : true
    //},
  })
  
  const Product = mongoose.model("products", productsSchema)
  
  export default Product