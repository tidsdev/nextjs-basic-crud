import mongoose ,{ Schema } from "mongoose";

const myOrderSchema = new Schema(
  {
    productId: { type: String},
    // createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const MyOrder = mongoose.models.MyOrder || mongoose.model("MyOrder", myOrderSchema);

export default MyOrder;


