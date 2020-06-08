import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Users from "./pages/users";
import Books from "./pages/books";

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Route component={Home} path="/" exact /> */}
      <Route component={Books} path="/livros" />
      <Route component={Users} path="/usuarios" />
      {/* <Route component={Loans} path="/loans" exact /> */}
    </BrowserRouter>
  );
};

export default Routes;
