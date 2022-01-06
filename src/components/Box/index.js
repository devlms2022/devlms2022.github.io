import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

const BoxCustom = (props) => {
  const {
    direction = "col",
    px,
    py,
    background,
    justify = "flex-start",
    align = "flex-start",
    children,
  } = props;
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: direction === "col" ? "column" : "row",
        paddingX: px,
        paddingY: py,
        background,
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </Box>
  );
};

const boxStyled = styled(Box)``;

export default BoxCustom;
