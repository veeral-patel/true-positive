import { Layout } from "antd";
import React from "react";
const { Content } = Layout;

interface ObservablesProps {}

const ObservablesP: React.FC<ObservablesProps> = () => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h2>Observables</h2>
  </Content>
);

export default ObservablesP;
