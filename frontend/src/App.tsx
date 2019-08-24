import { Router } from "@reach/router";
import AddCommentToCaseModal from "container/all_cases/AddCommentToCaseModal";
import AddTagsModal from "container/all_cases/AddTagsModal";
import AssignCasesModal from "container/all_cases/AssignCasesModal";
import ChangePriorityModal from "container/all_cases/ChangePriorityModal";
import ChangeStatusModal from "container/all_cases/ChangeStatusModal";
import CreateCaseModal from "container/all_cases/CreateCaseModal";
import MergeCasesModal from "container/all_cases/MergeCasesModal";
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
      <ChangeStatusModal />
      <ChangePriorityModal />
      <AddCommentToCaseModal />
      <MergeCasesModal />
      <AssignCasesModal />
    </div>
  );
};

export default App;
