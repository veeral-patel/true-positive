import React from "react";
import AllCasesPage from "pages/cases/AllCasesPage";
import Page404 from "pages/shared/Page404";
import { Router } from "@reach/router";
import TopMenu from "presentational/shared/top_menu/TopMenu";

const App: React.FC = () => {
  return (
    <div>
      <TopMenu />
      <Router style={{ margin: "3%", marginTop: "2%" }}>
        <AllCasesPage path="/" />
        <AllCasesPage path="/cases" />
        <Page404 default />
      </Router>
    </div>
  );
};

export default App;
