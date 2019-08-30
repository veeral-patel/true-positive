import { navigate } from "@reach/router";
import { Col, Divider, Layout, PageHeader, Row } from "antd";
import DetailsP from "presentational/one_task/DetailsSectionP";
import DescriptionP from "presentational/shared/description/DescriptionP";
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
      height: "100%"
    }}
  >
    <PageHeader
      onBack={() => navigate(getPathToCaseTasks(activeCase.id))}
      title={activeTask.name}
    />

    <DetailsP activeTask={activeTask} />

    <section>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Description</Divider>
          <DescriptionP description={activeTask.description} />
        </Col>
      </Row>
    </section>
  </Content>
);

export default OneTaskP;
