import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb, Layout } from "antd";
import React from "react";
import { paths } from "utils/constants";
const { Content } = Layout;

const Info: React.FC<RouteComponentProps> = () => (
  <div>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Case Name</Breadcrumb.Item>
      <Breadcrumb.Item>Info</Breadcrumb.Item>
    </Breadcrumb>
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
