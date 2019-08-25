import { Layout } from "antd";
import React from "react";
import OneCaseBreadcrumb from "./OneCaseBreadcrumb";
const { Content } = Layout;

interface IndicatorsProps {
  caseName: string;
}

const IndicatorsP: React.FC<IndicatorsProps> = ({ caseName }) => (
  <div>
    <OneCaseBreadcrumb caseName={caseName} tabName="Indicators" />
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

export default IndicatorsP;
