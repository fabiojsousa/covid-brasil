import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../components/Home";
import Week from "../components/Week";
import Month from "../components/Month";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/semana" component={Week} />
      <Route path="/mes" component={Month} />
    </BrowserRouter>
  );
}

export default Routes;
