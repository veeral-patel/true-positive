import { Tag } from "antd";
import React from "react";

interface IPriorityTagProps {
  priorityName: string;
}

const PriorityTagP: React.FC<IPriorityTagProps> = ({ priorityName }) => {
  if (priorityName === "High") {
    return <Tag color="red">{priorityName}</Tag>;
  } else if (priorityName === "Medium") {
    return <Tag color="orange">{priorityName}</Tag>;
  } else if (priorityName === "Low") {
    return <Tag color="green">{priorityName}</Tag>;
  } else {
    return <Tag>{priorityName}</Tag>;
  }
};

export default PriorityTagP;
