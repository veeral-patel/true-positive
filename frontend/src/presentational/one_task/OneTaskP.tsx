import { navigate } from "@reach/router";
import { Layout, PageHeader } from "antd";
import React from "react";
import ICase from "ts/interfaces/ICase";
import ITask from "ts/interfaces/ITask";
import { getPathToCaseTasks } from "utils/pathHelpers";

const { Content } = Layout;

interface OneTaskProps {
  activeCase: ICase;
  activeTask: ITask;
}

const OneTaskP: React.FC<OneTaskProps> = ({ activeCase, activeTask }) => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      marginLeft: 24,
      height: "100%"
    }}
  >
    <PageHeader
      onBack={() => navigate(getPathToCaseTasks(activeCase.id))}
      title={activeTask.name}
    />
  </Content>
);

export default OneTaskP;
