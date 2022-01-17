import {
  Dashboard as DashboardIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Group as GroupIcon,
  Comment as CommentIcon,
  Feed as FeedIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import AppBarAdmin from "../components/Appbar/AppBarAdmin";
import routes from "../routes";
import TokenService from "../services/token.services";

const drawerWidth = 240;

function AdminLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userSign, setUserSign] = useState({});
  const { pathname } = useLocation();
  const history = new useHistory();

  const handleProfileClicked = (nav) => {
    if (nav === "logout") {
      TokenService.removeUser();
      document.location.href = "/";
    }
  };

  useEffect(() => {
    const userSign = TokenService.getUser();
    setUserSign({ ...userSign.data });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickPage = (route) => {
    history.push(route);
  };

  let pages = [];
  if (userSign.role_id === "3") {
    pages = [
      {
        label: "Dashboard",
        route: "/",
        icon: DashboardIcon,
      },
      {
        label: "Study Progress",
        route: "/study/progress",
        icon: SchoolIcon,
      },
      {
        label: "Join Group",
        route: "/join-group",
        icon: GroupIcon,
      },
      {
        label: "Discussion",
        route: "/discussion",
        CommentIcon,
      },
    ];
  } else {
    pages = [
      {
        label: "Dashboard",
        route: "/",
        icon: DashboardIcon,
      },
      {
        label: "Set Study",
        route: "/study/set",
        icon: SchoolIcon,
      },
      {
        label: "Set Discussion",
        route: "/discussion/set",
        icon: CommentIcon,
      },
      {
        label: "Report",
        route: "/report",
        icon: FeedIcon,
      },
    ];
  }
  

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <ListItem
              onClick={() => handleClickPage(page.route)}
              key={page.label}
              sx={{
                background:
                  pathname === page.route ? "var(--primary-color)" : null,
                color: pathname === page.route ? "white" : "inherit",
              }}
            >
              <ListItemIcon>
                <Icon
                  sx={{
                    color: pathname === page.route ? "white" : "inherit",
                  }}
                />
              </ListItemIcon>
              {/* <ListItemButton>{page.label}</ListItemButton> */}
              <ListItemTextStyled>{page.label}</ListItemTextStyled>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBarAdmin
        pathname={pathname}
        userSign={userSign}
        onProfileClick={(nav) => handleProfileClicked(nav)}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: `100%` },
        }}  
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Switch>
            {routes.map((item, key) => {
              if (item.layout === "admin") {
                const { component } = item;
                const Component = component;
                return (
                  <Route
                    path={`${item.path}`}
                    component={(props) => <Component {...props} />}
                    key={key}
                    exact={item.basePath}
                  />
                );
              } else {
                return;
              }
            })}
          </Switch>
        </Container>
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminLayout;

const ListItemTextStyled = styled(ListItemText)`
  &:hover {
    cursor: pointer;
    background-color: "var(--primary-color)";
  }
`;
