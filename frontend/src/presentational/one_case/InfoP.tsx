import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import React from "react";

const { Content } = Layout;

const Info: React.FC<RouteComponentProps> = () => (
  <div>
    <OneCaseBreadcrumb caseName="Case Name" tabName="Info" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      Info
    </Content>
  </div>
);

export default Info;
