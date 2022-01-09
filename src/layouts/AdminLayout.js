import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AppBarAdmin } from "../components/Appbar";
import routes from "../routes";
import TokenService from "../services/token.services";

const AdminLayout = (props) => {
  const [userSign, setUserSign] = useState({});

  const handleProfileClicked = (nav) => {
    if (nav === "logout") {
      TokenService.removeUser();
      document.location.href = "/";
    }
  };

  useEffect(() => {
    const userSign = TokenService.getUser();
    setUserSign({...userSign.data});
  }, []);


  return (
    <>
      <AppBarAdmin userSign={userSign} onProfileClick={(nav) => handleProfileClicked(nav)} />
      <Container maxWidth="xl">
        <Switch>
          {routes.map((item, key) => {
            if (item.layout === "admin") {
              const {component} = item;
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
    </>
  );
};

export default AdminLayout;
