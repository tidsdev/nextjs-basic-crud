import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";
export default function BasicModal({
  children,
  text,
}: {
  children?: React.ReactNode;
  text?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">{text}</Button>
      <Modal open={open} onClose={handleClose} className="p-4 m-4 flex">
        <Box className="p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-md w-[900px] h-[500px] overflow-y-auto no-scrollbar">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-bold">{text}</h3>
              <IconButton
              color="inherit"
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-100"
              >
                <CancelIcon fontSize="large" />
              </IconButton>
            </div>
            <hr className="my-3 mb-6" />
            {children || <div>No Content</div>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
