import { RouteComponentProps, Router } from "@reach/router";
import { Layout, notification } from "antd";
import CaseSider from "container/one_case/CaseSider";
import HandleErrorAndLoading from "container/one_case/HandleErrorAndLoading";
import Info from "container/one_case/Info";
import Members from "container/one_case/Members";
import Observables from "container/one_case/Observables";
import Tasks from "container/one_case/Tasks";
import ThisCaseHasBeenMergedAlert from "container/one_case/ThisCaseHasBeenMergedAlert";
import Tree from "container/one_case/Tree";
import OneTask from "container/one_task/OneTask";
import OneTaskBreadcrumb from "container/one_task/OneTaskBreadcrumb";
import { inject, observer } from "mobx-react";
import ActivityPaneP from "presentational/one_case/ActivityPaneP";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import Page404 from "presentational/shared/errors/Error404P";
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
            message: "Unable to extract the case's ID from the URL",
            description: "Ensure you're at a valid URL"
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
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Info"
                        path="/"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Info"
                        path="/info"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Tree"
                        path="/tree"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Members"
                        path="/members"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Observables"
                        path="/observables"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Tasks"
                        path="/tasks"
                      />
                      <OneTaskBreadcrumb path="/tasks/:taskId" />
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
                      <Observables path="/observables" />
                      <Tasks path="/tasks" />
                      <OneTask path="/tasks/:taskId" />
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
