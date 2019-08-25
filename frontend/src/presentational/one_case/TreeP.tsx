import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import React from "react";
import OneCaseBreadcrumb from "./OneCaseBreadcrumb";
const { Content } = Layout;

interface TreeProps extends RouteComponentProps {
  caseName: string;
}

const Tree: React.FC<TreeProps> = ({ caseName }) => (
  <div>
    <OneCaseBreadcrumb caseName={caseName} tabName="Tree" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Tree</h2>
    </Content>
  </div>
);

export default Tree;
