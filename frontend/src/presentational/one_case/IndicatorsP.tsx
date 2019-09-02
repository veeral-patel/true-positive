import { Layout } from "antd";
import IndicatorTable from "container/shared/indicators/IndicatorTable";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
const { Content } = Layout;

interface IndicatorsProps {
  indicators: IIndicator[];
}

const IndicatorsP: React.FC<IndicatorsProps> = ({ indicators }) => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h2>Indicators</h2>
    <IndicatorTable indicators={indicators} />
  </Content>
);

export default IndicatorsP;
