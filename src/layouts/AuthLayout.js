import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const AuthLayout = () => {

  return (
    <Routes>
      {routes.map((item, key) => {
        if (item.layout === "auth") {
          return (
            <Route
              path={`${item.path}`}
              element={item.component}
              key={key}
              exact={item.basePath}
            />
          );
        } else {
          return;
        }
      })}
      {/* <Route path="*" element /> */}
    </Routes>
  );
};

export default AuthLayout;
