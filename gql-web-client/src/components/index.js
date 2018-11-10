import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.scss";
import TestPage from "./TestPage";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
import ErrorPage from "./ErrorPage";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    return hasError ? (
      <ErrorPage />
    ) : (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TestPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/:unfoundLocation" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
