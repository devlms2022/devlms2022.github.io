import { Container } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button/Button";
import HeaderLogin from "../Header/HeaderLogin";


const AppBarLanding = (props) => {
  const { signinClicked } = props;
  let location = useLocation();
  const { pathname } = location;

  if (pathname === "/signup") {
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
        <Button onClick={signinClicked} variant="outlined">
          SIGN IN
        </Button>
      </Container>
    </AppBarStyled>
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
