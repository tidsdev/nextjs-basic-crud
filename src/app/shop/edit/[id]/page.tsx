"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { Product } from "../../../../interfaces/product";
import InputFileUpload from "../../../components/uis/upload";
import AOS from "aos";
import "aos/dist/aos.css";

function EditPostPage({ params }) {
  const id = React.use(params);
  console.log(id);
  const [productData, setProductData] = useState<Product>({
    _id: "",
    name: "",
    code: "",
    img_base64: "",
    description: "",
    price: 0,
    stock_quantity: 0,
  });

  //new data
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const router = useRouter();

  const getPostById = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch post data");
      }

      const data = await res.json();

      setProductData(data.post);
    } catch (error) {
      console.log(error);
      alert(`Error Edit Get Post : ${error} 
        \n NEXT_PUBLIC_API_URL : ${process.env.NEXT_PUBLIC_API_URL}`);
    }
  };

  useEffect(() => {
    AOS.init();
    getPostById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newTitle, newImg, newContent }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update post");
      }
      router.refresh();
      router.push("/shop");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Edit Post {productData._id}</h3>
      <hr className="my-3" />
      <Link
        href={"/"}
        className="bg-gray-500  inline-block text-white border py-2 px-3 rounded my-2"
      >
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <InputFileUpload
          onChange={(value) => handleChange("img_base64", value)}
        ></InputFileUpload>
        <input
          type="text"
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={productData.name}
        />
        <input
          type="text"
          onChange={(e) => setNewImg(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={productData.img_base64}
        />
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          name=""
          id=""
          cols={30}
          rows={10}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 mb-6"
          placeholder={productData.description}
        ></textarea>
        <Button type="submit" variant="contained" color="primary">
          Edit Post
        </Button>
      </form>
    </div>
  );
}

export default EditPostPage;
