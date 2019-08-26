import { RouteComponentProps, Router } from "@reach/router";
import { Layout, notification } from "antd";
import CaseSider from "container/one_case/CaseSider";
import HandleErrorAndLoading from "container/one_case/HandleErrorAndLoading";
import Indicators from "container/one_case/Indicators";
import Info from "container/one_case/Info";
import Members from "container/one_case/Members";
import Tasks from "container/one_case/Tasks";
import ThisCaseHasBeenMergedAlert from "container/one_case/ThisCaseHasBeenMergedAlert";
import Tree from "container/one_case/Tree";
import { inject, observer } from "mobx-react";
import Page404 from "pages/shared/Page404";
import ActivityPaneP from "presentational/one_case/ActivityPaneP";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface ICasePageProps extends RouteComponentProps {
  caseId?: number;
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class CasePage extends React.Component<ICasePageProps> {
      componentDidMount() {
        const { activeCaseStore, caseId } = this.props;
        if (caseId) {
          activeCaseStore!.setActiveCaseId(caseId);
        } else {
          notification.error({
            message: "Unable to extract caseId from the URL",
            description: "Check if you're on a valid URL"
          });
        }
      }

      componentWillUnmount() {
        const { activeCaseStore, caseId } = this.props;
        if (caseId) {
          activeCaseStore!.setActiveCaseId(null);
        }
      }

      render() {
        const { activeCaseStore } = this.props;
        return (
          <Layout>
            <CaseSider />
            <Layout style={{ padding: "0 24px 24px" }}>
              <HandleErrorAndLoading>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <ThisCaseHasBeenMergedAlert />
                </div>
                <div>
                  {activeCaseStore!.activeCase !== null && (
                    <Router>
                      <OneCaseBreadcrumb
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Info"
                        path="/"
                      />
                      <OneCaseBreadcrumb
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Info"
                        path="/info"
                      />
                      <OneCaseBreadcrumb
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Tree"
                        path="/tree"
                      />
                      <OneCaseBreadcrumb
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Members"
                        path="/members"
                      />
                      <OneCaseBreadcrumb
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Indicators"
                        path="/indicators"
                      />
                      <OneCaseBreadcrumb
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Tasks"
                        path="/tasks"
                      />
                    </Router>
                  )}
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 5 }}>
                    <Router>
                      <Info path="/" />
                      <Info path="/info" />
                      <Tree path="/tree" />
                      <Members path="/members" />
                      <Indicators path="/indicators" />
                      <Tasks path="/tasks" />
                      <Page404 default showBackButton={false} />
                    </Router>
                  </div>
                  <div style={{ flex: 2 }}>
                    <ActivityPaneP />
                  </div>
                </div>
              </HandleErrorAndLoading>
            </Layout>
          </Layout>
        );
      }
    }
  )
);
