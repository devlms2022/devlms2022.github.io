import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { AppBarAdmin } from "../components/Appbar";
import routes from "../routes";
import TokenService from "../services/token.services";

const AdminLayout = (props) => {

  const handleProfileClicked = (nav) => {
    if (nav === "logout") {
      TokenService.removeUser();
      document.location.reload();
    }
  };

  return (
    <>
      <AppBarAdmin onProfileClick={(nav) => handleProfileClicked(nav)} />
      <Container>
        <Switch>
          {routes.map((item, key) => {
            if (item.layout === "admin") {
              return (
                <Route
                  path={`${item.path}`}
                  component={item.component}
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
