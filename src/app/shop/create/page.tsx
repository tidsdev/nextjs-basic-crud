"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BasicModal from "../../components/uis/modal";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { Delete, Article } from "@mui/icons-material";
import DeleteProduct from "../../components/Delete";
import InputFileUpload from "../../components/uis/upload";
import { Product } from "../../../interfaces/product";
import AOS from "aos";
import "aos/dist/aos.css";
import Example from "../../components/uis/carousel";

interface FormErrors {
  name?: string;
  code?: string;
  img_base64?: string;
  description?: string;
  stock_quantity?: number;
}

const productSchema = z.object({
  name: z.string().min(1, "*Product Name is Required..."),
  code: z.string().min(1, "*Product Code is Required..."),
  img_base64: z.string().min(1, "*Image is Required..."),
  stock_quantity: z.number().min(1, "*Product Quantity is Required..."),
  description: z.string().min(1, "*Description is Required..."),
});

const columns: GridColDef[] = [
  { field: "_id", headerName: "No.", width: 70 },
  {
    field: "img_base64",
    headerName: "Product Image",
    width: 150,
    align: "center",
    headerAlign: "center",

    renderCell: (params) => {
      const { img_base64 } = params.row;
      return (
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={img_base64}
            alt="Product"
            width={80} // กำหนดขนาดความกว้าง
            height={80} // กำหนดขนาดความสูง
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  { field: "code", headerName: "Product Code", width: 150 },
  { field: "name", headerName: "Product Name", flex: 1 },
  { field: "description", headerName: "Product Description", flex: 1 },
  { field: "stock_quantity", headerName: "Product Quantity", width: 150 },
  {
    field: "Action",
    headerName: "Action",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center gap-2 w-full h-full">
          {/* ปุ่ม Edit */}
          <IconButton
            color="primary"
            href={`/shop/edit/${params.row._id}`}
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // เพิ่มเงา
            }}
          >
            <Article />
          </IconButton>
  
          {/* ปุ่ม Delete */}
          <IconButton
            color="error"
            onClick={() => DeleteProduct(params.row._id)}
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // เพิ่มเงา
            }}
          >
            <Delete />
          </IconButton>
        </div>
      );
    },
  }
];

const paginationModel = { page: 0, pageSize: 5 };

function CreatePostPage() {
  const [errors, setErrors] = useState<FormErrors>({});

  const [product, setProduct] = useState<Product>({
    _id: null,
    name: "",
    code: "",
    img_base64: "",
    description: "",
    price: 0,
    stock_quantity: 0,
  });

  const [postData, setPostData] = useState([]);

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   !product.name ||
    //   !product.img_base64 ||
    //   !product.description ||
    //   !product.code ||
    //   !product.stock_quantity
    // ) {
    //   alert("Please fill all the fields");
    //   return;
    // }
    try {
      // Validate product data
      productSchema.parse(product);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: product.name,
            code: product.code,
            img_base64: product.img_base64,
            description: product.description,
            price: product.price,
            stock_quantity: product.stock_quantity,
          }),
        }
      );
      if (res.ok) {
        alert("Product created successfully");
        await getPosts();
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.log("Error creating post: ", error);
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.log(error);
      }
    }
  };

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

  useEffect(() => {
    AOS.init();
    getPosts();
  }, []);

  return (
    <>
      <BasicModal text="Add Product">
        <form onSubmit={handleSubmit}>
          <Grid container={true} spacing={2}>
            <Grid size={6}>
              <InputFileUpload
                onChange={(value) => handleChange("img_base64", value)}
              ></InputFileUpload>
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Product Name"
                variant="outlined"
                onChange={(e) => handleChange("name", e.target.value)} //setName(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth={true}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Product Code"
                variant="outlined"
                onChange={(e) => handleChange("code", e.target.value)} //setCode(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth={true}
                error={!!errors.code}
                helperText={errors.code}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                id="outlined-basic"
                size="small"
                label="Product Quantity"
                variant="outlined"
                onChange={(e) =>
                  handleChange("stock_quantity", Number(e.target.value))
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                error={!!errors.stock_quantity}
                helperText={errors.stock_quantity}
                fullWidth={true}
              ></TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Description"
                variant="outlined"
                onChange={(e) => handleChange("description", e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                rows={4}
                multiline={true}
                fullWidth={true}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid size={2}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </BasicModal>

      <div data-aos="fade-up" className="mt-4">
        <DataGrid
          rows={postData}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          sx={{ border: 0,
            "& .MuiDataGrid-row:nth-of-type(odd)" : {
              backgroundColor : "#f5f5f5",
            },
            "& .MuiDataGrid-row:nth-of-type(even)" : {
              backgroundColor : "#fff",
            }
           }}
          className=""
          rowHeight={100}
          loading={postData.length === 0}
          disableRowSelectionOnClick={true}
        />
      </div>
    </>
  );
}

export default CreatePostPage;
