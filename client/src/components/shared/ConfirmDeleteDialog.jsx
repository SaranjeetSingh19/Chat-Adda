import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
     
    <Dialog open={open} onClose={handleClose}> 
    <Stack spacing={"1rem"} padding={"1rem"} width={"27rem"} sx={{bgcolor: "#00242D", color: "white"}}> 

      <DialogTitle> Confirm Delete </DialogTitle>
      <DialogContent>
        <DialogContentText color={"orange"}>
          Are you sure.. you want to delete this group ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deleteHandler}>Yes</Button>
      </DialogActions>
      </Stack>
    </Dialog>
   
  );
};

export default ConfirmDeleteDialog;
