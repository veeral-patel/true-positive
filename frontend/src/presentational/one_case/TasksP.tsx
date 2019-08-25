import { Layout } from "antd";
import React from "react";
import OneCaseBreadcrumb from "./OneCaseBreadcrumb";
const { Content } = Layout;

interface TasksProps {
  caseName: string;
}

const TasksP: React.FC<TasksProps> = ({ caseName }) => (
  <div>
    <OneCaseBreadcrumb caseName={caseName} tabName="Tasks" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Tasks</h2>
    </Content>
  </div>
);

export default TasksP;
