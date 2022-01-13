import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

const BoxCustom = (props) => {
  const {
    direction = "col",
    px,
    py,
    mx,
    my,
    mb,
    mt,
    background,
    justify = "flex-start",
    align = "flex-start",
    children,
    width,
    height,
  } = props;
  return (
    <Box
      {...props}
      sx={{
        width,
        height,
        display: "flex",
        flexDirection: direction === "col" ? "column" : "row",
        paddingX: px,
        paddingY: py,
        background,
        justifyContent: justify,
        alignItems: align,
        marginX: mx,
        marginY: my,
        marginBottom: mb,
        marginTop: mt,
      }}
    >
      {children}
    </Box>
  );
};

const boxStyled = styled(Box)``;

export default BoxCustom;
