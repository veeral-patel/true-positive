import { Typography } from "antd";
import TasksTableP from "presentational/tasks/TasksTableP";
import React from "react";
import ITask from "ts/interfaces/ITask";

const { Paragraph } = Typography;

interface IExpandedRowProps {
  description: string;
  tasks: ITask[];
}

const ExpandedRow: React.FC<IExpandedRowProps> = ({ description, tasks }) => (
  <div style={{ marginTop: "20px", marginBottom: "50px" }}>
    <Paragraph style={{ margin: "0px" }}>{description}</Paragraph>
    <br />
    <div>
      {tasks.length === 0 ? (
        <span />
      ) : (
        <div style={{ width: "80%" }}>
          <h3>Tasks ({tasks.length})</h3>
          <TasksTableP tasks={tasks} />
        </div>
      )}
    </div>
  </div>
);

export default ExpandedRow;
