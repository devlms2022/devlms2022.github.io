import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Button, Grid } from "@mui/material";
import BoxCustom from "../Box";
import styled from "styled-components";

export default function UserList(props) {
  const { users } = props;
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.length > 0 &&  users.map((user, key) => {
        return (
          <ListItem sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xl={6}>
                <BoxCustom align="center" direction="row">
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <UserInfo>
                    <span className="name">
                      {user.profile.fullname} <span className="active">active</span>
                    </span>
                    <span className="email">{user.email}</span>
                    <span className="joined_date">
                      Joined Date : 2022, 11 January
                    </span>
                  </UserInfo>
                </BoxCustom>
              </Grid>
              <Grid item xl={6}>
                <BoxCustom align="center" direction="row">
                  <Button size="small">SEE MORE</Button>
                </BoxCustom>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
      {users.length === 0 && (
          <div>No Data Result</div>
      )}
    </List>
  );
}

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  span.name {
    span {
      font-size: 12px;
      font-weight: 300;
      &.active {
        color: var(--primary-color);
      }
    }
  }

  span.email {
    color: #848484;
  }
  span.joined_date {
    color: #848484;
    font-size: 12px;
  }
`;
