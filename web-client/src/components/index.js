import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, About, NotFound } from "./allRoutes";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
