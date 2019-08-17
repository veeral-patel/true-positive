import React from "react";
import AllCasesPage from "./pages/cases/AllCasesPage";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <Router>
      <AllCasesPage path="/" />
      <AllCasesPage path="/cases" />
    </Router>
  );
};

export default App;
