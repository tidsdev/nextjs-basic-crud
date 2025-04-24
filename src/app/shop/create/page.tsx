"use client";

import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import BasicModal from "../../components/uis/modal";
import { Button, Grid, Icon, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { Delete, Article, Visibility } from "@mui/icons-material";
import DeleteProduct from "../../components/Delete";
import VisuallyHiddenInput from "../../components/uis/upload";

const columns: GridColDef[] = [
  { field: "_id", headerName: "No.", width: 70 },
  {
    field: "img",
    headerName: "Product Image",
    width: 150,
    align: "center",
    headerAlign: "center",

    renderCell: (params) => {
      const { img } = params.row;
      return (
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={img}
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
  { field: "title", headerName: "Product Name", flex: 1 },
  { field: "content", headerName: "Product Description", flex: 1 },
  { field: "quantity", headerName: "Product Quantity", width: 150 },
  {
    field: "Action",
    headerName: "Action",
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <IconButton color="primary" href={`/shop/edit/${params.row._id}`}>
            <Article></Article>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => DeleteProduct(params.row._id)}
          >
            <Delete></Delete>
          </IconButton>
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [postData, setPostData] = useState([]);
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !img || !content || !code || !quantity) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, img, content, code, quantity }),
        }
      );
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

  const getPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
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
    getPosts();
  }, []);

  const router = useRouter();
  return (
    <>
      <BasicModal text="Add Product">
        <form onSubmit={handleSubmit}>
          <Grid container={true} spacing={2}>
            <Grid size={6}>
              <Image src={img} width={300} height={0} alt="1"/>
              {/* <VisuallyHiddenInput></VisuallyHiddenInput> */}
            </Grid>

            <Grid size={6}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Product Name"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth={true}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Product Code"
                variant="outlined"
                onChange={(e) => setCode(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth={true}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                id="outlined-basic"
                size="small"
                label="Product Quantity"
                variant="outlined"
                onChange={(e) => setQuantity(Number(e.target.value))}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth={true}
              ></TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Post Img Url"
                variant="outlined"
                onChange={(e) => setImg(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth={true}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                id="outlined-basic"
                size="small"
                label="Description"
                variant="outlined"
                onChange={(e) => setContent(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                rows={4}
                multiline={true}
                fullWidth={true}
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
      <div className="mt-4">
        <DataGrid
          rows={postData}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          sx={{ border: 0 }}
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
