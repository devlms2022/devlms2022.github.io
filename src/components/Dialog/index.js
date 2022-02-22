import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from 'prop-types';

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
    onSave,
    isLoading=false
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
          {showSaveButton && <Button disabled={isLoading} onClick={onSave} variant="contained" color="primary">{btnSaveLabel?btnSaveLabel : "Save"}</Button>}
          <Button disabled={isLoading} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DialogCustome.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  showSaveButton: PropTypes.bool,
  btnSaveLabel: PropTypes.string,
  onSave: PropTypes.func,
  isLoading: PropTypes.bool
};
