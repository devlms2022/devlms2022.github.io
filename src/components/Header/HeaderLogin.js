import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ButtonCustom from "../Button/Button";

const HeaderLogin = (props) => {
  const { Home } = props;
  return (
    <Back>
      <IconButton size="large" onClick={Home}>
        <HomeIcon fontSize="inherit" />
      </IconButton>
    </Back>
  );
};

const Back = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
`;

export default HeaderLogin;
