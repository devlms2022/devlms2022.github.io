import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LinearProgressWithLabel(props) {
  const { value = 0, className, variant } = props;

  return (
    <Box className={className} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <LinearProgress sx={{height : '23px', borderRadius: '14px'}} variant={variant} {...props} />
        </Box>
        <Box sx={{ width: "10%" }}>
          <Typography variant="body" color="text.secondary">{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
};
