import { Router } from "@reach/router";
import AddCommentToCaseModal from "container/all_cases/AddCommentToCaseModal";
import AddTagsModal from "container/all_cases/AddTagsModal";
import AssignCasesModal from "container/all_cases/AssignCasesModal";
import ChangePriorityModal from "container/all_cases/ChangePriorityModal";
import ChangeStatusModal from "container/all_cases/ChangeStatusModal";
import CreateCaseModal from "container/all_cases/CreateCaseModal";
import MergeCasesModal from "container/all_cases/MergeCasesModal";
import RemoveTagsModal from "container/all_cases/RemoveTagsModal";
import MergeOneCaseModal from "container/one_case/MergeOneCaseModal";
import TopMenu from "container/shared/top_menu/TopMenu";
import { inject, observer } from "mobx-react";
import AdminPage from "pages/admin/AdminPage";
import AllCasesPage from "pages/cases/AllCasesPage";
import CasePage from "pages/cases/CasePage";
import AllTasksPage from "pages/tasks/AllTasksPage";
import Page404 from "presentational/shared/errors/Error404P";
import React from "react";
import AuthStore from "stores/AuthStore";

interface Props {
  authStore?: AuthStore;
}

export default inject("authStore")(
  observer(
    class App extends React.Component<Props> {
      render() {
        const { authStore } = this.props;
        return (
          <div>
            {authStore!.loggedIn() ? (
              <div>
                <TopMenu />
                <Router style={{ margin: "3%", marginTop: "2%" }}>
                  <AllCasesPage path="/" />
                  <AllCasesPage path="/cases" />
                  <AllTasksPage path="/tasks" />
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
                <AssignCasesModal />
                <MergeCasesModal />
                <MergeOneCaseModal />
              </div>
            ) : (
              <h3>Not logged in</h3>
            )}
          </div>
        );
      }
    }
  )
);
