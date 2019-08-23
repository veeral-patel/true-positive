import { Router } from "@reach/router";
import AddTagsModal from "container/all_cases/AddTagsModal";
import CreateCaseModal from "container/all_cases/CreateCaseModal";
import RemoveTagsModal from "container/all_cases/RemoveTagsModal";
import AllCasesPage from "pages/cases/AllCasesPage";
import CasePage from "pages/cases/CasePage";
import Page404 from "pages/shared/Page404";
import TopMenuP from "presentational/shared/top_menu/TopMenuP";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <TopMenuP />
      <Router style={{ margin: "3%", marginTop: "2%" }}>
        <AllCasesPage path="/" />
        <AllCasesPage path="/cases" />
        <CasePage path="/cases/:id/*" />
        <Page404 default />
      </Router>
      <AddTagsModal />
      <RemoveTagsModal />
      <CreateCaseModal />
    </div>
  );
};

export default App;
