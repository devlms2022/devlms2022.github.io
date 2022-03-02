import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import React from "react";

export default function DialogFull(props) {
  const {
    fullWidth = true,
    maxWidth = "sm",
    open = false,
    onClose,
    children,
    showSaveButton,
    componentBtn,
    p = "8px",
  } = props;

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
      >
        <DialogContent sx={{ padding: p }}>{children}</DialogContent>
        
        <DialogActions>{showSaveButton && componentBtn}</DialogActions>
      </Dialog>
    </>
  );
}

DialogFull.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  onSave: PropTypes.func,
  p: PropTypes.string,
  showSaveButton: PropTypes.bool,
  componentBtn: PropTypes.element,
};
