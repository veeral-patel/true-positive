import { Router } from "@reach/router";
import AddCommentToCaseModal from "container/all_cases/AddCommentToCaseModal";
import AddTagsModal from "container/all_cases/AddTagsModal";
import AssignCasesModal from "container/all_cases/AssignCasesModal";
import ChangePriorityModal from "container/all_cases/ChangePriorityModal";
import ChangeStatusModal from "container/all_cases/ChangeStatusModal";
import CreateCaseModal from "container/all_cases/CreateCaseModal";
import MergeCasesModal from "container/all_cases/MergeCasesModal";
import RemoveTagsModal from "container/all_cases/RemoveTagsModal";
import IndicatorDrawer from "container/shared/indicators/IndicatorDrawer";
import TopMenu from "container/shared/top_menu/TopMenu";
import AdminPage from "pages/admin/AdminPage";
import AllCasesPage from "pages/cases/AllCasesPage";
import CasePage from "pages/cases/CasePage";
import Page404 from "presentational/shared/errors/Error404P";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <TopMenu />
      <Router style={{ margin: "3%", marginTop: "2%" }}>
        <AllCasesPage path="/" />
        <AllCasesPage path="/cases" />
        <AdminPage path="/admin" />
        <CasePage path="/cases/:caseId/*" />
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
      <IndicatorDrawer />
    </div>
  );
};

export default App;
