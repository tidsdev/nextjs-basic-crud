import mongoose ,{ Schema } from "mongoose";

const myOrderSchema = new Schema(
  {
    productId:  Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
)

const MyOrder = mongoose.models.MyOrder || mongoose.model("MyOrder", myOrderSchema);

export default MyOrder;


