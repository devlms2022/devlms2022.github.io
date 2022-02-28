import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ButtonCustom = (props) => {
  const { text, to, height, variant } = props;

  return <ButtonStyled {...props}>{text ? text : props.children}</ButtonStyled>;
};

const ButtonStyled = styled(Button)`
  background: ${(props) =>
    props.variant === "outlined"
      ? `var(--white-color)`
      : props.color
      ? "inherit"
      : "var(--primary-color)"};
  &:hover {
    background: ${(props) =>
      props.variant === "outlined"
        ? `var(--white-color)`
        : props.color
        ? "inherit"
        : "var(--primary-color)"};
  }
  height: ${(props) => (props.height ? props.height : "42px")};
  color: ${(props) =>
    props.variant === "outlined"
      ? `var(--primary-color)`
      : "var(--white-color)"};
  border: ${(props) =>
    props.variant === "outlined" && "1px solid var(--primary-color)"};
`;

export default ButtonCustom;
