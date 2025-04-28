import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Image from "next/image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    if (files) {
      const objectUrl = URL.createObjectURL(files);
      setPreview(objectUrl);
    }
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={100}
          height={100}
          style={{ marginTop: "10px" }}
        />
      )}
    </>
  );
}
