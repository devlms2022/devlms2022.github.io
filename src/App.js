import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
    </Routes>
  );
}

export default App;
