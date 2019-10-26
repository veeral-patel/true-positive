import { Progress, Tooltip } from "antd";
import React from "react";
import ICase from "ts/interfaces/ICase";

interface Props {
  theCase: ICase;
}

// Renders a progress bar indicating what % of a case's tasks have been completed
class TaskProgress extends React.Component<Props> {
  render() {
    const { theCase } = this.props;

    const numberOfDoneTasks = theCase.tasks.filter(task => task.done).length;
    const totalNumberOfTasks = theCase.tasks.length;

    // what % of this case's tasks are done
    const percentageDone = Math.round(
      (numberOfDoneTasks / totalNumberOfTasks) * 100
    );

    return (
      <Tooltip
        title={`${numberOfDoneTasks}/${totalNumberOfTasks} tasks are done`}
      >
        <Progress percent={percentageDone} style={{ width: "125px" }} />
      </Tooltip>
    );
  }
}

export default TaskProgress;
