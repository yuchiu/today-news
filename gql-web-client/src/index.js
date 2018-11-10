import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import apolloClient from "./apolloClient";
import Routes from "./components";

const app = (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
