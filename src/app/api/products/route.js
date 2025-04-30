import { connectMongoDB } from "../../../../lib/mongodb";
import product from "../../../../models/product"
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, img, content,code,quantity } = await req.json();
  await connectMongoDB();
  await product.create({
    title,
    img,
    content,
    code,
    quantity,
  });
  return NextResponse.json(
    { message: "Post created successfully" },
    { status: 201 }
  );
}

export async function GET(){
  await connectMongoDB();
  const posts = await product.find({});
  return NextResponse.json({posts});
}

export async function DELETE(req){
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await product.findByIdAndDelete(id);
  return NextResponse.json({message: "Deleted successfully"}, {status: 200})
}
