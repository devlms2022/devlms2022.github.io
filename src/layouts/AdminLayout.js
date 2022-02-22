// import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import AppBarAdmin from "../components/Appbar/AppBarAdmin";
import Breadcrumb from "../components/Breadcrump";
import MenuItem from "../components/Menu/MenuItem";
import { Menuadmin, MenuTeacher } from "../data/sidebarmenu";
import routes from "../routes";
import { Api } from "../services/api";
import TokenService from "../services/token.services";

const drawerWidth = 250;

function AdminLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userSign, setUserSign] = useState({});
  const { pathname } = useLocation();
  const match = useRouteMatch();
  const history  = useHistory();


  const handleProfileClicked = (nav) => {
    if (nav === "logout") {
      const user = TokenService.getUser();
      const refreshToken = user.refreshToken;
      Api.post("/logout", {
        refresh_token: refreshToken,
      })
        .then((res) => {
          TokenService.removeUser();
          document.location.href = "/";
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const userSign = TokenService.getUser();
    setUserSign({ ...userSign.data });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let menus = [];
  if (userSign.role_id === "2") {
    menus = MenuTeacher;
  } else if (userSign.role_id === "1") {
    menus = Menuadmin;
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <SidebarWrap>
        {menus.map((item, key) => {
          return <MenuItem item={item} key={key} />;
        })}
      </SidebarWrap>
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
        <Container maxWidth="xl">
          {/* <BreadcrumbWrap>
            <Breadcrumb />
          </BreadcrumbWrap> */}
          <Switch>
            {routes.map((item, key) => {
              if (item.layout === "admin") {
                const { component } = item;
                const Component = component;
             
                return (
                  <Route
                    path={`${match.url}${item.path}`}
                    component={(props) => <Component  basePath={item.parent} {...props} />}
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
  window: PropTypes.func,
};

export default AdminLayout;

const SidebarWrap = styled.div`
  width: 100%;
`;

const BreadcrumbWrap = styled.div`
  width: 100%;
  margin-bottom: 35px;
`;

const Container = styled(Box)`
  width: 100%;
  padding: 20px;
  @media screen and (max-width: 768px) {
    padding: 0px;
  }
  /* padding: 10px; */
`;
