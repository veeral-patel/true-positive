import React from "react";
import AllCasesPage from "./pages/cases/AllCasesPage";
import Page404 from "./pages/shared/Page404";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <Router>
      <AllCasesPage path="/" />
      <AllCasesPage path="/cases" />
      <Page404 default />
    </Router>
  );
};

export default App;
