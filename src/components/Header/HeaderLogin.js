import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const HeaderLogin = (props) => {
  const { onClick } = props;
  return (
    <BoxStyled
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <IconButton onClick={onClick}>
        <Close fontSize="inherit" />
      </IconButton>
    </BoxStyled>
  );
};

const BoxStyled = styled(Box)`
  padding: 5px;
`;

export default HeaderLogin;
