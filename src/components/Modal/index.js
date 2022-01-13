import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box, styled, width } from "@mui/system";
import React from "react";
import { Subtitle } from "../Text";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 2;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  //   bgcolor: "background.paper",
  bgcolor: "var(--white-color)",
  borderRadius: "8px",
  p: 2,
  px: 4,
  pb: 3,
};

export default function Modal(props) {
  let { open = false, onClose, width, size = "md", title } = props;
  if (!width) {
    width = 600;
    if (size == "lg") width = 800;
    if (size == "xl") width = 1080;
  }

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      BackdropComponent={Backdrop}
      open={open}
      onClose={onClose}
    >
      <Box sx={{ ...style, width }}>
        <HeaderModal>
          <Subtitle>{title}</Subtitle>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </HeaderModal>
        {props.children}
      </Box>
    </StyledModal>
  );
}

const HeaderModal = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
