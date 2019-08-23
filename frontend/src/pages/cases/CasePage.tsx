import { RouteComponentProps, Router } from "@reach/router";
import { Layout } from "antd";
import CaseSider from "container/one_case/CaseSider";
import IndicatorsP from "presentational/one_case/IndicatorsP";
import InfoP from "presentational/one_case/InfoP";
import MembersP from "presentational/one_case/MembersP";
import TasksP from "presentational/one_case/TasksP";
import React from "react";

interface ICasePageProps extends RouteComponentProps {}

const CasePage: React.FC<ICasePageProps> = () => (
  <Layout>
    <CaseSider />
    <Layout style={{ padding: "0 24px 24px" }}>
      <Router>
        <InfoP path="/" />
        <InfoP path="/info" />
        <MembersP path="/members" />
        <IndicatorsP path="/indicators" />
        <TasksP path="/tasks" />
      </Router>
    </Layout>
  </Layout>
);

export default CasePage;
