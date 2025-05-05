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
      <h1
        data-aos="fade-right"
        className="text-4xl font-extrabold text-center mb-8 text-gray-800"
      >
        Product Showcase
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <motion.div
              data-aos="zoom-in-up"
              key={val._id}
              className="shadow-lg p-6 rounded-lg bg-white hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={val.img_base64 || "/"}
                width={300}
                height={0}
                alt={val.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <p className="mb-2 text-1xl font-medium text-gray-800">
                ชื่อสินค้า : {val.name}
              </p>
              <p className="mb-4 text-1xl font-medium text-gray-800">
                รายละเอียดสินค้า : {val.description}
              </p>
              <div className="flex justify-between items-center gap-2">
                <Button
                  onClick={() => addOrder(val._id)}
                  variant="contained"
                  color="primary"
                  className="w-full"
                >
                  Add to crat
                </Button>
                <Button variant="outlined" color="secondary" className="w-full">
                  Detail
                </Button>
              </div>
            </motion.div>
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
