import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogCustome(props) {
  const {
    fullWidth = true,
    maxWidth = "sm",
    open = false,
    onClose,
    title,
    children,
    showSaveButton,
    btnSaveLabel,
    onSave
  } = props;

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              width : "100%",
              padding: "12px",
              flexDirection: "column"
            }}
          >
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          {showSaveButton && <Button onClick={onSave} variant="contained" color="primary">{btnSaveLabel?btnSaveLabel : "Save"}</Button>}
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
