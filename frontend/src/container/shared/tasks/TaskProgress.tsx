import { Progress, Tooltip } from "antd";
import React from "react";

interface Props {
  completedTaskCount: number;
  totalTaskCount: number;
}

// Renders a progress bar indicating what % of a case's tasks have been completed
function TaskProgress(props: Props) {
  const { completedTaskCount, totalTaskCount } = props;

  // what % of this case's tasks are done
  const percentageDone = Math.round(
    (completedTaskCount / totalTaskCount) * 100
  );

  return (
    <Tooltip title={`${completedTaskCount}/${totalTaskCount} tasks are done`}>
      <Progress percent={percentageDone} style={{ width: "125px" }} />
    </Tooltip>
  );
}

export default TaskProgress;
