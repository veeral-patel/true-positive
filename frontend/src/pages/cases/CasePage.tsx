import { RouteComponentProps, Router } from "@reach/router";
import { Layout } from "antd";
import CaseSider from "container/one_case/CaseSider";
import Info from "container/one_case/Info";
import React from "react";

interface ICasePageProps extends RouteComponentProps {}

const CasePage: React.FC<ICasePageProps> = () => (
  <Layout>
    <CaseSider />
    <Layout style={{ padding: "0 24px 24px" }}>
      <Router>
        <Info path="/" />
        <Info path="/info" />
      </Router>
    </Layout>
  </Layout>
);

export default CasePage;
