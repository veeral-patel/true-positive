import { RouteComponentProps, Router } from "@reach/router";
import { Layout, Typography } from "antd";
import CaseSider from "container/one_case/CaseSider";
import Forms from "container/one_case/Forms";
import HandleErrorAndLoading from "container/one_case/HandleErrorAndLoading";
import Indicators from "container/one_case/Indicators";
import Info from "container/one_case/Info";
import Members from "container/one_case/Members";
import Tasks from "container/one_case/Tasks";
import ThisCaseHasBeenMergedAlert from "container/one_case/ThisCaseHasBeenMergedAlert";
import OneIndicator from "container/one_indicator/OneIndicator";
import OneIndicatorBreadcrumb from "container/one_indicator/OneIndicatorBreadcrumb";
import OneTask from "container/one_task/OneTask";
import OneTaskBreadcrumb from "container/one_task/OneTaskBreadcrumb";
import { inject, observer } from "mobx-react";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import Page404 from "presentational/shared/errors/Error404P";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

const { Text } = Typography;
const { Content } = Layout;

interface Props extends RouteComponentProps {
  caseId?: number;
  activeCaseStore?: ActiveCaseStore;
  uiStore?: UIStore;
}

export default inject(
  "activeCaseStore",
  "uiStore"
)(
  observer(
    class CasePage extends React.Component<Props> {
      componentDidMount() {
        const { activeCaseStore, caseId } = this.props;
        if (caseId) {
          activeCaseStore!.setActiveCaseId(caseId);
        }
      }

      componentWillUnmount() {
        const { activeCaseStore, caseId } = this.props;
        if (caseId) {
          activeCaseStore!.setActiveCaseId(null);
        }
      }

      componentDidUpdate(previousProps: Props) {
        if (previousProps.caseId !== this.props.caseId) {
          this.componentDidMount();
        }
      }

      render() {
        const { activeCaseStore } = this.props;
        return (
          <Layout>
            <CaseSider />
            <Layout style={{ padding: "0px 24px 24px", marginRight: "2%" }}>
              <HandleErrorAndLoading>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <ThisCaseHasBeenMergedAlert />
                </div>
                <div>
                  {activeCaseStore!.activeCase && (
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
                        tabName="Tasks"
                        path="/tasks"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Indicators"
                        path="/indicators"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Forms"
                        path="/forms"
                      />
                      <OneCaseBreadcrumb
                        caseId={activeCaseStore!.activeCase.id}
                        caseName={activeCaseStore!.activeCase.name}
                        tabName="Members"
                        path="/members"
                      />
                      <OneTaskBreadcrumb path="/tasks/:taskId" />
                      <OneIndicatorBreadcrumb path="/indicators/:indicatorId" />
                    </Router>
                  )}
                </div>
                <div style={{ overflow: "hidden", borderRadius: "8px" }}>
                  <Router>
                    <Info path="/" />
                    <Info path="/info" />
                    <Members path="/members" />
                    <Indicators path="/indicators" />
                    <Forms path="/forms" />
                    <Tasks path="/tasks" />
                    <OneTask path="/tasks/:taskId" />
                    <OneIndicator path="/indicators/:indicatorId" />
                    <Page404 default showBackButton={false} />
                  </Router>
                </div>
              </HandleErrorAndLoading>
            </Layout>
          </Layout>
        );
      }
    }
  )
);
