import { Typography } from "@mui/material";
import React from "react";

const TextLight = (props) => {
  const { children } = props;
  return (
    <Typography variant="caption" color="gray" display="block" >
      {children}
    </Typography>
  );
};
export default TextLight 