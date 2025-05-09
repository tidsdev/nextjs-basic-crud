import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import member from "../../../../models/member";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { username, password } = await req.json();
  // สร้าง Token
  const token = jwt.sign(
    { id: user._id, username: user.username }, // payload
    process.env.JWT_SECRET || "your-secret-key", // secret key
    { expiresIn: "1h" } // ตัวเลือก เช่น อายุของ token
  );
  await connectMongoDB();
  await member.create({
    username,
    password,
    email,
    tokenId: token,
  });

  return NextResponse.json(
    { message: "Post created successfully" },
    { status: 201 }
  );
}
