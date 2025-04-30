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
  const {
    newTitle: title,
    newImg: img,
    newContent: content,
    newCode: code,
    newQuantity: quantity,
  } = await req.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, {
    title,
    img,
    content,
    code,
    quantity,
  });
  return NextResponse.json(
    { message: "Post updated successfully" },
    { status: 200 }
  );
}
