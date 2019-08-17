import React from "react";
import { Tag } from "antd";

interface IPriorityTagProps {
  priorityName: string;
}

const PriorityTagP: React.SFC<IPriorityTagProps> = ({ priorityName }) => {
  if (priorityName === "High") {
    return <Tag color="red">{priorityName}</Tag>;
  } else if (priorityName === "Medium") {
    return <Tag color="volcano">{priorityName}</Tag>;
  } else if (priorityName === "Low") {
    return <Tag color="gold">{priorityName}</Tag>;
  } else {
    return <Tag>{priorityName}</Tag>;
  }
};

export default PriorityTagP;
