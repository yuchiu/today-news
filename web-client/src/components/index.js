import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Testing, Landing, NotFound } from "./allRoutes";
import "./index.scss";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/testing" component={Testing} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
