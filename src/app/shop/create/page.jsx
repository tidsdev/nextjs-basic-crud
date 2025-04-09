"use client";

import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !img || !content) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, img, content }),
      });
      console.log(res.body);
      if (res.ok) {
        router.push("/shop");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="my-3" />
      <Link
        href={"/"}
        className="bg-gray-500  inline-block text-white border py-2 px-3 rounded my-2"
      >
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Post Title"
        />
        <input
          type="text"
          onChange={(e) => setImg(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Post Img Url"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Ener your content"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
