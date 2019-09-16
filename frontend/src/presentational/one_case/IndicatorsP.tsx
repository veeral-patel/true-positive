import { Button, Layout } from "antd";
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
    <div>
      <span style={{ display: "inline-block" }}>
        <h2>Indicators ({indicators.length})</h2>
      </span>
      <span style={{ float: "right" }}>
        <Button icon="plus">Create Indicator</Button>
      </span>
    </div>{" "}
  </Content>
);

export default IndicatorsP;
