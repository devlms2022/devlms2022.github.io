import { Box } from "@mui/material";
import React from "react";

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


export default BoxCustom;
