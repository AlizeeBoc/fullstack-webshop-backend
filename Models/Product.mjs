import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    reference: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Decimal128,
        required: true,
    },
imageURL: {
    type: String,
    required : false,
}
});

const Product = mongoose.model("products", productsSchema);

export default Product;
