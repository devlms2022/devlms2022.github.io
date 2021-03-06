import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../Button/Button";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import HeaderLogin from "../Header/HeaderLogin";

const AppbarCustom = (props) => {
  const location = useLocation();

  const {pathname} = location;

  if (pathname === "/signin" || pathname === "signup") {
    return <HeaderLogin />;
  }

  return (
    <AppBarStyled>
      <Container className="container">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/about">
          About Us
        </Link>
        <Link className="link" to="/course">
          Course
        </Link>
        <Button variant="outlined">
          <Link className="signin" to="/signin">
            SIGN IN
          </Link>
        </Button>
      </Container>
    </AppBarStyled>
  );
};

const AppBarStyled = styled.div`
  background-color: var(--background-light-color);
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
export default AppbarCustom;
