import { Close } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ButtonCustom from "../Button/Button";

const HeaderLogin = (props) => {
  const { onClick } = props;
  return (
    <BoxStyled
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <ButtonCustom text="Back to home" variant="outlined" onClick={onClick} />
    </BoxStyled>
  );
};

const BoxStyled = styled(Box)`
  padding: 5px;
`;

export default HeaderLogin;
