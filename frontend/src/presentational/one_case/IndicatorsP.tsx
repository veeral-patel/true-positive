import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import React from "react";
import OneCaseBreadcrumb from "./OneCaseBreadcrumb";
const { Content } = Layout;

const Indicators: React.FC<RouteComponentProps> = () => (
  <div>
    <OneCaseBreadcrumb caseName="Case Name" tabName="Indicators" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Indicators</h2>
    </Content>
  </div>
);

export default Indicators;
