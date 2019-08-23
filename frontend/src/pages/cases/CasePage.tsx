import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb, Layout } from "antd";
import CaseSider from "container/one_case/CaseSider";
import React from "react";
import { paths } from "utils/constants";

const { Content } = Layout;

interface ICasePageProps extends RouteComponentProps {}

const CasePage: React.FC<ICasePageProps> = () => (
  <Layout>
    <CaseSider />
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Case Name</Breadcrumb.Item>
        <Breadcrumb.Item>Tab Name</Breadcrumb.Item>
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
