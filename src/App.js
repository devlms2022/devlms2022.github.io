import React from "react";
import { Route, Switch } from "react-router-dom";
import Appbar from "./components/Appbar";
import routes from "./routes";

function App(props) {
  return (
    <>
      <Appbar />;
      <Switch>
        {routes.map((item, key) => {
          return (
            <Route
              path={`${item.path}`}
              component={item.component}
              key={key}
              exact={item.basePath}
            />
          );
        })}
      </Switch>
    </>
  );
}

export default App;
