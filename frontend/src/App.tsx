import { ApolloProvider } from "@apollo/react-hooks";
import { Router } from "@reach/router";
import CreateCaseModal from "container/all_cases/CreateCaseModal";
import MergeOneCaseModal from "container/one_case/MergeOneCaseModal";
import TopMenu from "container/shared/top_menu/TopMenu";
import client from "createApolloClient";
import { inject, observer } from "mobx-react";
import AdminPage from "pages/admin/AdminPage";
import AllCasesPage from "pages/cases/AllCasesPage";
import CasePage from "pages/cases/CasePage";
import LoginPage from "pages/login/LoginPage";
import AllTasksPage from "pages/tasks/AllTasksPage";
import Page404 from "presentational/shared/errors/Error404P";
import React from "react";
import Helmet from "react-helmet";
import AuthStore from "stores/AuthStore";
import UIStore from "stores/UIStore";
import { paths } from "utils/constants";
import "./dark.css";

interface Props {
  authStore?: AuthStore;
  uiStore?: UIStore;
}

export default inject(
  "authStore",
  "uiStore"
)(
  observer(
    class App extends React.Component<Props> {
      state = {
        dark: true
      };

      render() {
        const { authStore, uiStore } = this.props;

        return (
          <>
            <ApolloProvider client={client}>
              {authStore!.loggedIn() ? (
                <div>
                  <TopMenu />
                  <Router style={{ margin: "3%", marginTop: "2%" }}>
                    <AllCasesPage path={paths.ROOT_PATH} />
                    <AllCasesPage path={paths.CASES_PATH} />
                    <AllTasksPage path={paths.TASKS_PATH} />
                    <AdminPage path={paths.MANAGE_PATH} />
                    <CasePage path="/cases/:caseId/*" />
                    <Page404 default />
                  </Router>
                  <CreateCaseModal />
                  <MergeOneCaseModal />
                </div>
              ) : (
                <LoginPage />
              )}
            </ApolloProvider>
            <Helmet>
              {uiStore!.theme === "LIGHT" ? (
                <link rel="stylesheet" href="./light.css" />
              ) : (
                <link rel="stylesheet" href="./dark.css" />
              )}
            </Helmet>
          </>
        );
      }
    }
  )
);
