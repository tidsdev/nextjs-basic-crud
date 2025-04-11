"use client";

import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import BasicModal from "../../components/uis/modal";
import { Button, Grid, TextField } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "No.", width: 70 },
  { field: "image", headerName: "Product Image", width: 130 },
  { field: "code", headerName: "Product Code", width: 130 },
  { field: "name", headerName: "Product Name", width: 130 },
  { field: "quantity", headerName: "Product Quantity", width: 130 },
  { field: "description", headerName: "Product Description", width: 150 },
];

const rows = [
  { id: 1, name: "Snow", firstName: "Jon", age: 35 },
  { id: 2, name: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, name: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, name: "Stark", firstName: "Arya", age: 16 },
  { id: 5, name: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, name: "Melisandre", firstName: null, age: 150 },
  { id: 7, name: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, name: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, name: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, img, content }),
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

  const router = useRouter();
  return (
    <>
      <BasicModal text="Add Product">
        <form onSubmit={handleSubmit}>
          <Grid container={true} spacing={2}>
            <Grid size={12}>
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
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          sx={{ border: 0 }}
          className=""
        />
      </div>
    </>
  );
}

export default CreatePostPage;
