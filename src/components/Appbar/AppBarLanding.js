import MenuIcon from "@mui/icons-material/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  Box,
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button/Button";
import HeaderLogin from "../Header/HeaderLogin";

const AppBarLanding = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (open) => {
    setOpenMenu(open);
  };

  const { signinClicked } = props;
  let location = useLocation();
  const { pathname } = location;

  if (pathname === "/signup") {
    return <HeaderLogin />;
  }

  const ElevationScroll = (props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: false,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  };

  return (
    <Navbar>
      <ElevationScroll {...props}>
        <AppBar className="navbar">
          <Container>
            <Toolbar
              disableGutters
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "flex" },
                  color: "black",
                }}
              >
                LOGO
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  gap: 6,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Typography sx={{ my: 2, display: "block" }}>
                  <Link className="link" to="/">
                    Home
                  </Link>
                </Typography>
                <Typography sx={{ my: 2, display: "block" }}>
                  <Link className="link" to="/about">
                    About Us
                  </Link>
                </Typography>
                <Typography sx={{ my: 2, display: "block" }}>
                  <Link className="link" to="/course">
                    Studies
                  </Link>
                </Typography>
                <Button
                  sx={{ my: 2, display: "block" }}
                  onClick={signinClicked}
                  variant="outlined"
                >
                  SIGN IN
                </Button>
              </Box>

              {/* Menu Hamburger */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => toggleDrawer(true)}
                  color="inherit"
                >
                  <MenuIcon className="iconHamburger" />
                </IconButton>
              </Box>

              <SwipeableDrawer
                anchor="right"
                open={openMenu}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => toggleDrawer(false)}
                  onOpen={() => toggleDrawer(true)}
                >
                  <List>
                    <ListItem button>
                      <Link className="link" to="/">
                        Home
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link className="link" to="/about">
                        About Us
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link className="link" to="/course">
                        Studies
                      </Link>
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem>
                      <Button
                        sx={{ my: 2, display: "block" }}
                        onClick={signinClicked}
                        variant="outlined"
                      >
                        SIGN IN
                      </Button>
                    </ListItem>
                  </List>
                </Box>
              </SwipeableDrawer>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </Navbar>
  );
};

const Navbar = styled.div`
  margin-bottom: 10vw;

  .navbar {
    background-color: var(--white-color);
  }

  a,
  .iconHamburger {
    color: black;
  }

  a:hover {
    color: var(--primary-color);
  }

  .signin {
    font-weight: 600;
  }
`;
export default AppBarLanding;
