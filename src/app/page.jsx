"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteBtn from "../app/DeleteBtn";

export default function Home() {
  const [postData, setPostData] = useState([]);
  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto">
      <h1>NextJS Crud + MongoDB</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded">
        <Link href="/create">Create Post</Link>
      </button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
              <h4>{val.title}</h4>
              <Image src={val.img} width={300} height={0} alt={val.title} />
              <p className="mb-4">{val.content}</p>
              <div>
                <Link
                  className="bg-gray-500 text-white border px-3 py-2 rounded-md text-lg my-2"
                  href={`/edit/${val._id}`}
                >
                  Edit
                </Link>
                <DeleteBtn id={val._id}/>
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-200 p-3 my-3">you do not have any posts yet</p>
        )}
      </div>
    </main>
  );
}
