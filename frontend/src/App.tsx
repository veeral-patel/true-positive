import { Router } from "@reach/router";
import AddTagsModal from "container/cases/AddTagsModal";
import RemoveTagsModal from "container/cases/RemoveTagsModal";
import TopMenu from "container/shared/top_menu/TopMenu";
import AllCasesPage from "pages/cases/AllCasesPage";
import Page404 from "pages/shared/Page404";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <TopMenu />
      <Router style={{ margin: "3%", marginTop: "2%" }}>
        <AllCasesPage path="/" />
        <AllCasesPage path="/cases" />
        <Page404 default />
      </Router>
      <AddTagsModal />
      <RemoveTagsModal />
    </div>
  );
};

export default App;
