import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Subtitle } from "../Text";

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
    btnComponent
  } = props;

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
      >
        <DialogHeader
          style={{
            display: title ? "flex" : "none",
          }}
        >
          <Subtitle>{title}</Subtitle>
        </DialogHeader>
        <IconButton
          sx={{
            position: "absolute",
            right: 6,
            top: 2,
          }}
          disabled={isLoading}
          onClick={onClose}
        >
          <Close />
        </IconButton>
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
          {showSaveButton && !btnComponent && (
            <Button
              disabled={isLoading}
              onClick={onSave}
              variant="contained"
              color="primary"
            >
              {btnSaveLabel ? btnSaveLabel : "Save"}
            </Button>
          )}
          {btnComponent && !showSaveButton && (
            btnComponent
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
  btnComponent : PropTypes.func
};

const DialogHeader = styled.div`
  justify-content: space-between;
  align-items: center;
  /* background: red; */
  padding: 10px;
`;
