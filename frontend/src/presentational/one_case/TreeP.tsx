import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import React from "react";
const { Content } = Layout;

interface TreeProps extends RouteComponentProps {}

const Tree: React.FC<TreeProps> = () => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h3>Tree</h3>
  </Content>
);

export default Tree;
