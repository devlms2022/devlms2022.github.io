import { Close } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { Box, styled, width } from "@mui/system";
import React from "react";
import { Subtitle } from "../Text";

const style = {
  position: "absolute",
  top: "52%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--white-color)",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  overflowY: "scroll",
  height: "85%",
  display: "block",
};

export default function ModalCustom(props) {
  let { open = false, onClose, width,title } = props;

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      sx={{zIndex : 9}}
      onClose={onClose}
    >
      <BoxStyled sx={{...style, width}} >
        <HeaderModal>
          <Subtitle>{title}</Subtitle>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </HeaderModal>
        {props.children}
      </BoxStyled>
    </Modal>
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

const BoxStyled = styled(Box)`
  @media only screen and (max-width: 428px ) {
    width: 100%;
  }

  width: 65%;
`;