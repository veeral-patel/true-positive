import { Layout } from "antd";
import IndicatorTableP from "presentational/shared/indicators/IndicatorTableP";
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
    <IndicatorTableP indicators={indicators} />
  </Content>
);

export default IndicatorsP;
