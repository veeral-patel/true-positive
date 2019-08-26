import { Layout } from "antd";
import React from "react";
const { Content } = Layout;

interface IndicatorsProps {}

const IndicatorsP: React.FC<IndicatorsProps> = () => (
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
);

export default IndicatorsP;
