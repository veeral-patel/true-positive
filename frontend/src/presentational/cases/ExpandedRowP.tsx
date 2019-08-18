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
  <div>
    <Paragraph style={{ margin: "0px" }}>{description}</Paragraph>
    <br />
    <div>
      {tasks.length === 0 ? (
        <p>No tasks.</p>
      ) : (
        <div>
          <h4>Tasks ({tasks.length})</h4>
          <TasksTableP tasks={tasks} />
        </div>
      )}
    </div>
  </div>
);

export default ExpandedRow;
