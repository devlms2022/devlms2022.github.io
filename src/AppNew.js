import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import LandingLayout from "./layouts/LandingLayout";
import TokenService from "./services/token.services";
import utilities from "./utils/utilities";

const App = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const isLogin = TokenService.getUser();
    if (isLogin) {
      setUser(isLogin);
    }
  }, []);

  return (
    <Switch>    
      <Route
        path="/"
        render={(props) =>
          utilities.objectLength(user) === 0 ? (
            <LandingLayout signIn={(user) => setUser(user)} {...props} />
          ) : (
            <AdminLayout {...props} />
          )
        }
      />
    </Switch>
  );
};

export default App;
