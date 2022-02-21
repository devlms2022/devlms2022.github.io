import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ButtonCustom from "../Button/Button";

const HeaderLogin = (props) => {
  const { onClick } = props;
  return (
    <Back onClick={onClick}>
      <CloseIcon />
    </Back>
  );
};

const Back = styled.div`
  margin-top: 10px;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export default HeaderLogin;
