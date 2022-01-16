import MenuIcon from "@mui/icons-material/Menu";
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
  ListItemText,
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

  return (
    <AppBar position="static">
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
            <Typography sx={{ my: 2, color: "white", display: "block" }}>
              <Link className="link" to="/">
                Home
              </Link>
            </Typography>
            <Typography sx={{ my: 2, color: "white", display: "block" }}>
              <Link className="link" to="/about">
                About Us
              </Link>
            </Typography>
            <Typography sx={{ my: 2, color: "white", display: "block" }}>
              <Link className="link" to="/course">
                Studies
              </Link>
            </Typography>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
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
              <MenuIcon />
            </IconButton>
          </Box>

          <SwipeableDrawer
            anchor={"right"}
            open={openMenu}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => toggleDrawer(false)}
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
                    sx={{ my: 2, color: "white", display: "block" }}
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
  );
};

const AppBarStyled = styled.div`
  background-color: var(--white-color);
  display: flex;
  flex-direction: row;
  padding: 35px;
  padding-bottom: 35px;

  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .link {
    margin-right: 55px;
    &:hover {
      color: var(--primary-color);
    }
  }
  .signin {
    font-weight: 600;
  }
`;
export default AppBarLanding;
