"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@mui/material";
import { ObjectId } from "mongoose";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myCrats`,
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
        alert("Crat added successfully");
      } else {
        throw new Error("Failed to add Crat");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add order");
    }
  };

  useEffect(() => {
    getPosts();
    AOS.init();
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Lorem ipsum dolor sit amet.</h1>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <div
              data-aos="zoom-in-up"
              key={val._id}
              className="shadow-md p-4 rounded-lg"
            >
              <h4 className="text-xl font-bold mb-2">{val.title}</h4>
              <Image
                src={val.img_base64 || "/"}
                width={300}
                height={0}
                alt={val.name}
              />
              <p className="mb-4">{val.description}</p>
              <div className="flex justify-start items-center gap-2">
                <Button
                  onClick={() => addOrder(val._id)}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
                <Button variant="contained" color="inherit">
                  Detail
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
      <motion.ul animate={{ rotate: 360 }} />
    </main>
  );
}
