const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://admin:123@cluster0.hxc2bvb.mongodb.net/";

async function testMongoDBConnection() {
  try {
    // เชื่อมต่อ MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  } finally {
    // ปิดการเชื่อมต่อ
    mongoose.connection.close();
  }
}

testMongoDBConnection();