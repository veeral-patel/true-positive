import { Col, Divider, Row } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ITask from "ts/interfaces/ITask";
import formatISO8601 from "utils/formatISO8601";

interface DetailsProps {
  activeTask: ITask;
}

const DetailsP: React.FC<DetailsProps> = ({ activeTask }) => (
  <section style={{ lineHeight: 3 }}>
    <Row>
      <Col span={24}>
        <Divider orientation="left">Details</Divider>
      </Col>
    </Row>
    <Row>
      <Col span={4}>Status:</Col>
      <Col span={8}>
        <StatusTagP statusName={activeTask.status.name} />
      </Col>
      <Col span={4}>Created:</Col>
      <Col span={8}>
        {`${formatISO8601(activeTask.createdAt)} UTC by ${
          activeTask.createdBy.username
        }`}
      </Col>
    </Row>
    <Row>
      <Col span={4}>Priority:</Col>
      <Col span={8}>
        <PriorityTagP priorityName={activeTask.priority.name} />
      </Col>
      <Col span={4}>Assigned To:</Col>
      <Col span={8}>
        {activeTask.assignedTo ? activeTask.assignedTo.username : "N/A"}
      </Col>
    </Row>
    <Row>
      <Col span={4}>Tags:</Col>
      <Col span={8}>{<ListOfTagsP tags={activeTask.tags} />}</Col>
    </Row>
  </section>
);

export default DetailsP;
