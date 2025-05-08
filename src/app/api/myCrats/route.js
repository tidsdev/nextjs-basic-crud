import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import myOrder from "../../../../models/myOrder";
import mongoose, { Schema } from "mongoose";

export async function POST(req) {
  try {
    const { productId } = await req.json();
    await connectMongoDB();
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid productId");
    }
    console.log("productId", productId);
    const objectId = new mongoose.Types.ObjectId(`${productId}`);
    if (mongoose.Types.ObjectId.isValid(objectId)) {
      console.log("objectId is valid", objectId);

      await myOrder.create({
        productId: objectId,
      });

      return NextResponse.json(
        { message: "Order created successfully" },
        { status: 201 }
      );
    } else {
      console.log("objectId is not valid", objectId);
      return NextResponse.json(
        { message: "Invalid productId" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  try {
    const myOrders = await myOrder.aggregate([
      {
        $lookup: {
          from: "products", // ชื่อ collection ของสินค้าใน MongoDB
          localField: "productId", // ฟิลด์ใน myOrders
          foreignField: "_id", // ฟิลด์ใน products
          as: "productDetails", // ชื่อฟิลด์ที่รวมข้อมูลสินค้า
        },
      },
    ]);
    console.log(myOrders);
    return NextResponse.json({ myOrders });
  } catch (error) {}
}
