import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  { 
    code: String,
    name: String,
    img_base64: String,
    description: String,
    price: Number,
    stock_quantity: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;