import mongoose from "mongoose";

// export const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//   }
//   catch(error){
//     console.log("Error connecting to MongoDB", error);
//   }
// }

const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  }
};

export { connectMongoDB };