import { RouteComponentProps } from "@reach/router";
import { Breadcrumb, Layout } from "antd";
import CaseSider from "container/cases/CaseSider";
import React from "react";

const { Content } = Layout;

interface ICasePageProps extends RouteComponentProps {}

const CasePage: React.FC<ICasePageProps> = () => (
  <Layout>
    <CaseSider />
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        Content
      </Content>
    </Layout>
  </Layout>
);

export default CasePage;
