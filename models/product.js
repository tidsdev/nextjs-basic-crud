import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  { 
    title: String,
    img: String,
    content: String,
    code: String,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;