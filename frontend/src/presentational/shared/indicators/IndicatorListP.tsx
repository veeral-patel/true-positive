import { List } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface IndicatorListProps {
  indicators: IIndicator[];
}

const IndicatorListP: React.FC<IndicatorListProps> = ({ indicators }) => (
  <List
    itemLayout="horizontal"
    dataSource={indicators}
    bordered
    renderItem={indicator => <List.Item>{indicator.name}</List.Item>}
  />
);

export default IndicatorListP;
