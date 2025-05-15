import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import member from "../../../../models/member";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
export async function POST(req) {
  try {
    const { username, password, email } = await req.json();

    await connectMongoDB();

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      SECRET_KEY
    ).toString();

    console.log("SECRET_KEY : " + SECRET_KEY);
    console.log("Encrypted Password: ", encryptedPassword);

    await member.create({
      username,
      password: encryptedPassword,
      email,
    });

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      meesage: "Error creating order : " + error.message + " ",
      error: error,
      status: 500,
    });
  }
}
