import { RouteComponentProps, Router } from "@reach/router";
import { Layout, notification } from "antd";
import CaseSider from "container/one_case/CaseSider";
import { inject, observer } from "mobx-react";
import Page404 from "pages/shared/Page404";
import IndicatorsP from "presentational/one_case/IndicatorsP";
import InfoP from "presentational/one_case/InfoP";
import MembersP from "presentational/one_case/MembersP";
import TasksP from "presentational/one_case/TasksP";
import TreeP from "presentational/one_case/TreeP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface ICasePageProps extends RouteComponentProps {
  caseId?: number;
  activeCaseStore?: ActiveCaseStore;
}

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

  render() {
    return (
      <Layout>
        <CaseSider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Router>
            <InfoP path="/" />
            <InfoP path="/info" />
            <TreeP path="/tree" />
            <MembersP path="/members" />
            <IndicatorsP path="/indicators" />
            <TasksP path="/tasks" />
            <Page404 default showBackButton={false} />
          </Router>
        </Layout>
      </Layout>
    );
  }
}

export default inject("activeCaseStore")(observer(CasePage));
