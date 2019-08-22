import { Router } from "@reach/router";
import AddTagsModal from "container/cases/AddTagsModal";
import CreateCaseModal from "container/cases/CreateCaseModal";
import RemoveTagsModal from "container/cases/RemoveTagsModal";
import TopMenu from "container/shared/top_menu/TopMenu";
import AllCasesPage from "pages/cases/AllCasesPage";
import CasePage from "pages/cases/CasePage";
import Page404 from "pages/shared/Page404";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <TopMenu />
      <Router style={{ margin: "3%", marginTop: "2%" }}>
        <AllCasesPage path="/" />
        <AllCasesPage path="/cases" />
        <CasePage path="/cases/:id" />
        <Page404 default />
      </Router>
      <AddTagsModal />
      <RemoveTagsModal />
      <CreateCaseModal />
    </div>
  );
};

export default App;
