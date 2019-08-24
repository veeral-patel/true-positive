import { RouteComponentProps, Router } from "@reach/router";
import { Layout } from "antd";
import CaseSider from "container/one_case/CaseSider";
import Page404 from "pages/shared/Page404";
import IndicatorsP from "presentational/one_case/IndicatorsP";
import InfoP from "presentational/one_case/InfoP";
import MembersP from "presentational/one_case/MembersP";
import TasksP from "presentational/one_case/TasksP";
import TreeP from "presentational/one_case/TreeP";
import React from "react";

interface ICasePageProps extends RouteComponentProps {
  caseId?: number;
}

const CasePage: React.FC<ICasePageProps> = ({ caseId }) => (
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

export default CasePage;
