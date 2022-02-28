import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Menu, Toolbar, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import BoxCustom from "../Box";
import ProfileNav from "./ProfileNav";

const AppBarAdmin = (props) => {
  const drawerWidth = 240;
  const { handleDrawerToggle } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onProfileClick = (setting) => {
    props.onProfileClick(setting.toLowerCase());
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

export default AppBarAdmin;
