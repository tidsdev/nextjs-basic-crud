import { Button } from "@mui/material";
import React from "react";

function DeleteBtn({ id }) {
  const handleDelete = async () => {
    const comfirmed = confirm("Are you sure you want to delete this post?");
    if (comfirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteBtn;
