import React from "react";
import { Book, CheckCircleOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

export default function ListChapterLearning(props) {
  const { chapters = [], onClick } = props;
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {chapters.map((itm,key) => {
        return (
          <ListItem
            key={key}
            secondaryAction={<CheckCircleOutlined />}
            disablePadding
            sx={{ mb: "5px" }}
          >
            <ListItemButton
              onClick={() => onClick()}
              sx={{ p: "14px" }}
            >
              <Book sx={{mr:'4px'}} />
              <Typography variant="body">{itm.chapter_title}</Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
