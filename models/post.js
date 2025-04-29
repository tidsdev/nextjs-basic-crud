import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  { 
    title: String,
    img: String,
    content: String,
    code: String,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;