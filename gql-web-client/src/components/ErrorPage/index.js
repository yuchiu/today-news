import React from "react";

import { NavBar } from "@/components/common";

const ErrorPage = () => (
  <React.Fragment>
    <NavBar />
    <main className="error-page">
      <p>Oops... Error occured while loading the page.</p>
    </main>
  </React.Fragment>
);

export default ErrorPage;
