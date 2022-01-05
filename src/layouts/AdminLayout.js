import { Container } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { AppBarAdmin } from "../components/Appbar";
import routes from "../routes";

const AdminLayout = (props) => {
  return (
    <>
      <AppBarAdmin />
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
            {
              /* <Route path="*" element /> */
            }
          })}
        </Switch>
      </Container>
    </>
  );
};

export default AdminLayout;
