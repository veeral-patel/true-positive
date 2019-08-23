import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import React from "react";
import OneCaseBreadcrumb from "./OneCaseBreadcrumb";
const { Content } = Layout;

const Members: React.FC<RouteComponentProps> = () => (
  <div>
    <OneCaseBreadcrumb caseName="Case Name" tabName="Members" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      Members
    </Content>
  </div>
);

export default Members;
