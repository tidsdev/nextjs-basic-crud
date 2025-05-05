import React from "react";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const { name, img_base64, description } = await req.json();

  await connectMongoDB();

  const updateProduct = await Post.findByIdAndUpdate(
    id,
    {
      name,
      img_base64,
      description,
    },
    { new: true } // Return the updated document
  );

  if (!updateProduct) {
    return NextResponse.json(
      {
        message: "Product not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Product updated successfully", product: updateProduct },
    { status: 200 }
  );
}
