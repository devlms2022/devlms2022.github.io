import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const AppLayout = (props) => {

  return (
    <Routes>
      {routes.map((item, key) => {
        console.log(item);
        if (item.layout !== "auth") {
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

export default AppLayout;
