"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react"
import { Button } from "@mui/material";
import { ObjectId } from "mongoose";

export default function HomePage() {
  const [postData, setPostData] = useState([]);
  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log(
        "Error loading posts: ",
        error,
        "NEXT_PUBLIC_API_URL :",
        process.env.NEXT_PUBLIC_API_BASE_URL
      );
      alert("Failed to load First Page");
    }
  };

  const addOrder = async (id: ObjectId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myOrders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      console.log(res.body);

      if (res.ok) {
        alert("Order added successfully");
      } else {
        throw new Error("Failed to add order");
      }
    } catch (error) {
      console.log(error);
    alert("Failed to add order");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  
  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Lorem ipsum dolor sit amet.</h1>
      {/* <button className="bg-green-500 p-3 text-white rounded">
        <Link href="/shop/create">Create Post</Link>
      </button> */}
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <div key={val._id} className="shadow-md p-4 rounded-lg">
              <h4 className="text-xl font-bold mb-2">{val.title}</h4>
              <Image src={val.img || "/"} width={300} height={0} alt={val.title} />
              <p className="mb-4">{val.content}</p>
              <div className="flex justify-start items-center gap-2">
                {/* <Link
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm w-20 text-center"
                  href={`/shop/edit/${val._id}`}
                >
                  DETAIL
                </Link>
                <DeleteBtn id={val._id} /> */}
                <Button
                onClick={() => addOrder(val._id)}
                  variant="contained"
                  color="primary">
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="inherit">
                  Detail
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-200 p-3 my-3">you do not have any posts yet</p>
        )}
      </div>
      <motion.ul animate={{ rotate: 360 }}/>
    </main>
  );
}
