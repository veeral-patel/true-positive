import { Icon, Input, Layout } from "antd";
import TasksTableP from "presentational/tasks/TasksTableP";
import React from "react";
import ITask from "ts/interfaces/ITask";
const { Content } = Layout;

interface TasksProps {
  caseName: string;
  tasks: ITask[];
}

const TasksP: React.FC<TasksProps> = ({ caseName, tasks }) => (
  <div>
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Tasks ({tasks.length})</h2>
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Input placeholder="Filter tasks" prefix={<Icon type="search" />} />
      </div>
      <TasksTableP tasks={tasks} includeDescription={false} />
    </Content>
  </div>
);

export default TasksP;
