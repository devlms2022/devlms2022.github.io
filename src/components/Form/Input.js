import { TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { width, height, mr = 0, mb = 0, ml = 0, mt = 0 } = props;
  const style = {
    ml,
    mr,
    mb,
    mt,
  };
  if (width) style.width = width;
  if (height) style.height = height;

  return <InputStyled sx={{ ...style }} {...props} />;
};

const InputStyled = styled(TextField)``;

export default Input;
