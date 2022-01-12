import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import styled from "styled-components";
import BoxCustom from "../Box";
import ButtonLink from "../Button/ButtonLink";
import ProfileNav from "./ProfileNav";

const AppBarAdmin = (props) => {
  const { userSign, pathname } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  if (userSign.role_id === "3") {
    pages = [
      {
        label: "Dashboard",
        route: "/",
      },
      {
        label: "Study Progress",
        route: "/study/progress",
      },
      {
        label: "Join Group",
        route: "/join-group",
      },
      {
        label: "Discussion",
        route: "/discussion",
      },
    ];
  } else {
    pages = [
      {
        label: "Dashboard",
        route: "/",
      },
      {
        label: "Set Study",
        route: "/study/set",
      },
      {
        label: "Set Discussion",
        route: "/discussion/set",
      },
      {
        label: "Report",
        route: "/report",
      },
    ];
  }

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
    <AppBarStyled color="default" position="static">
      <Container maxWidth="xl">
        {/* <Toolbar disableGutters> */}
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((item, i) => (
                  <ButtonLink to={item.route} key={item.route}>
                    {item.label}
                  </ButtonLink>
                ))}
              </Menu>
            </Box>
            <BoxCustom direction="row" justify="center" align="center">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                ADMIN
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "space-evenly",
                  },
                  paddingY: "10px",
                }}
              >
                {pages.map((item, i) => (
                  <ButtonLink
                    isActive={pathname === item.route ? true : false}
                    to={item.route}
                    key={item.route}
                  >
                    {item.label}
                  </ButtonLink>
                ))}
              </Box>
            </BoxCustom>
          </Grid>
          <Grid item className="wrapRight" xs={6}>
            <BoxCustom
              direction="row"
              className="box"
              justify="flex-end"
              align="center"
            >
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
          </Grid>
        </Grid>

        {/* </Toolbar> */}
      </Container>
    </AppBarStyled>
  );
};

const AppBarStyled = styled(AppBar)`
  margin-bottom: 50px;
  .wrapRight {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .list-item {
      margin: 10px;
    }
  }
`;
export default AppBarAdmin;
