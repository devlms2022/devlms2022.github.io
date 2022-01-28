import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import styled from "styled-components";

export default function ListMenuContent(props) {
  const { data, onClickItemMenu, isActive } = props;
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav>
        <List>
          {data?.map((item, index) => {
            return (
              <ListItemStyled className={item.isActive ? 'active' : ''} onClick={()=>onClickItemMenu(item.name)} key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItemStyled>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

const ListItemStyled = styled(ListItem)`
    margin : 5px 0;
    &.active {
        background-color : rgba(0,0,0,0.04)

    }

`;
