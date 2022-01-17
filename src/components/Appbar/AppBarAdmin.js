import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Grid,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React from "react";
import BoxCustom from "../Box";
import Avatar from "@mui/material/Avatar";
import ProfileNav from "./ProfileNav";

const AppBarAdmin2 = (props) => {
  const drawerWidth = 240;
  const { window, handleDrawerToggle, userSign, pathname } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (setting) => {
    setAnchorElNav(null);
  };

  const onProfileClick = (setting) => {
    props.onProfileClick(setting.toLowerCase());
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickProfile = (e) => {
    const { name } = e.target;
    console.log(name);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        background: "var(--white-color)",
        color: "black",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <BoxCustom width="100%" direction="row" justify="flex-end">
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <ProfileNav onProfileClick={(param) => onProfileClick(param)} />
          </Menu>
        </BoxCustom>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarAdmin2;
