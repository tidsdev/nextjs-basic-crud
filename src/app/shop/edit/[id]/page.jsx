"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from '@mui/material/Button'

function EditPostPage({ params }) {
  const { id } = React.use(params);
  const [postData, setPostData] = useState("");

  //new data
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const router = useRouter();

  const getPostById = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch post data");
      }

      const data = await res.json();

      setPostData(data.post);
    } catch (error) {
      console.log(error);
      alert("Error Edit Get Post: ", error , "NEXT_PUBLIC_API_BASE_URL :" , process.env.NEXT_PUBLIC_API_URL);
    }
  };

  useEffect(() => {
    getPostById(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newImg, newContent }),
      })

      if(!res.ok) {
        throw new Error("Failed to update post");
      }
      router.refresh();
      router.push("/shop");
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Edit Post {id}</h3>
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
          onChange={(e) => setNewTitle (e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={postData.title}
        />
        <input
          type="text"
          onChange={(e) => setNewImg(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={postData.img}
        />
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 mb-6"
          placeholder={postData.content}
        ></textarea>
        {/* <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Edit Post
        </button> */}
        <Button type="submit" variant="contained" color="primary">
        Edit Post
        </Button>
      </form>
    </div>
  );
}

export default EditPostPage;
