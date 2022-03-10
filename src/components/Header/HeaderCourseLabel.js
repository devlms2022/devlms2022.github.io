import { AccountBox, Book, Group } from "@mui/icons-material";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import React from "react";

const HeaderCourseLabel = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      component="div"
    >
      <Typography variant="h5" component="span" sx={{ fontWeight: "500" }}>
        Title Course
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alginItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "row",
            alginItems: "center",
            flexWrap: "wrap",
            mt: "3px",
          }}
        >
          <Tooltip placement="top" sx={{ mr: "5px" }} title="faculty">
            <Chip
              size="small"
              label="Programming"
              variant="contained"
              color="primary"
            />
          </Tooltip>
          <Tooltip placement="top" title="Study">
            <Chip
              size="small"
              label="Computer Sience"
              variant="outlined"
              color="primary"
            />
          </Tooltip>
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "row",
            alginItems: "center",
            mt: "3px",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alginItems: "center",
              mr: "8px",
            }}
          >
            <Tooltip placement="top" title="Teacher Name">
              <AccountBox fontSize="small" />
            </Tooltip>
            <Typography variant="body2" component={"span"}>
              Bagus fatwan Alfiat
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alginItems: "center",
            }}
          >
            <Tooltip placement="top" title="Total Students">
              <Group fontSize="small" />
            </Tooltip>
            <Typography variant="body2" sx={{ mr: "5px" }} component={"span"}>
              0
            </Typography>
            <Tooltip placement="top" title="Total Chapters">
              <Book fontSize="small" />
            </Tooltip>
            <Typography variant="body2" component={"span"}>
              0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderCourseLabel;
