import { Tag } from "antd";
import React from "react";

interface IStatusTagProps {
  statusName: string;
}

const StatusTagP: React.SFC<IStatusTagProps> = ({ statusName }) => {
  if (statusName === "Open") {
    return <Tag color="red">{statusName}</Tag>;
  } else if (statusName === "In Progress") {
    return <Tag color="volcano">{statusName}</Tag>;
  } else if (statusName === "Closed") {
    return <Tag color="gold">{statusName}</Tag>;
  } else {
    return <Tag>{statusName}</Tag>;
  }
};

export default StatusTagP;
