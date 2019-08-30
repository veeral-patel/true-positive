import { Layout } from "antd";
import React from "react";
import ITask from "ts/interfaces/ITask";

const { Content } = Layout;

interface OneTaskProps {
  activeTask: ITask;
}

const OneTaskP: React.FC<OneTaskProps> = ({ activeTask }) => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      marginLeft: 24,
      height: "100%"
    }}
  >
    Name: {activeTask.name}
  </Content>
);

export default OneTaskP;
