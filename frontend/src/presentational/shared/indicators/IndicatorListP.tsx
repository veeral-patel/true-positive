import { Icon, List } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface NumberofCommentsProps {
  count: number;
}

const NumberOfComments: React.FC<NumberofCommentsProps> = ({ count }) => (
  <span>
    <Icon type="message" />
    <span style={{ marginLeft: "5px" }}>{count}</span>
  </span>
);

interface IndicatorListProps {
  indicators: IIndicator[];
}

const IndicatorListP: React.FC<IndicatorListProps> = ({ indicators }) => (
  <List
    itemLayout="horizontal"
    dataSource={indicators}
    bordered
    renderItem={indicator => (
      <List.Item
        actions={[<NumberOfComments count={indicator.comments.length} />]}
      >
        {indicator.name}
      </List.Item>
    )}
  />
);

export default IndicatorListP;
