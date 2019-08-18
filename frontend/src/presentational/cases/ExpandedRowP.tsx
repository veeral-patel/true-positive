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
  <div style={{ marginTop: "20px", marginBottom: "80px", width: "75%" }}>
    <Paragraph style={{ margin: "0px", marginBottom: "40px" }}>
      {description}
    </Paragraph>
    <div>
      {tasks.length === 0 ? (
        <span />
      ) : (
        <div>
          <h3>Tasks ({tasks.length})</h3>
          <TasksTableP tasks={tasks} />
        </div>
      )}
    </div>
  </div>
);

export default ExpandedRow;
