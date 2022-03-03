import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Subtitle } from "../Text";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

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
    isLoading = false,
    p = "12px",
  } = props;

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
      >
        <DialogHeader>
          <Subtitle>{title}</Subtitle>
          <IconButton disabled={isLoading} onClick={onClose}>
            <Close />
          </IconButton>
        </DialogHeader>
        <DialogContent>
          <Box
            component="div"
            sx={{
              display: "flex",
              width: "100%",
              padding: p,
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          {showSaveButton && (
            <Button
              disabled={isLoading}
              onClick={onSave}
              variant="contained"
              color="primary"
            >
              {btnSaveLabel ? btnSaveLabel : "Save"}
            </Button>
          )}
          {/* <Button disabled={isLoading} onClick={onClose}>Close</Button> */}
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
  isLoading: PropTypes.bool,
  p: PropTypes.string,
};

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: red; */
  padding: 10px;
`;
