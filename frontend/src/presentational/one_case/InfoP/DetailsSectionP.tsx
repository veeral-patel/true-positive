import { Col, Divider, Row } from "antd";
import EditableAssigneeTag from "presentational/shared/tags/EditableAssigneeTag";
import EditablePriorityTag from "presentational/shared/tags/EditablePriorityTag";
import EditableStatusTag from "presentational/shared/tags/EditableStatusTag";
import EditableTagList from "presentational/shared/tags/EditableTagList";
import React from "react";
import ICase from "ts/interfaces/ICase";

interface DetailsProps {
  activeCase: ICase;
}

const DetailsP: React.FC<DetailsProps> = ({ activeCase }) => (
  <section style={{ lineHeight: 3 }}>
    <Row>
      <Col span={24}>
        <Divider orientation="left">Details</Divider>
      </Col>
    </Row>
    <Row>
      <Col span={4}>Status:</Col>
      <Col span={8}>
        <EditableStatusTag statusName={activeCase.status.name} />
      </Col>
      <Col span={4}>Created:</Col>
      <Col span={8}>
        {`${activeCase.formattedCreatedAt} UTC by ${activeCase.createdBy.username}`}
      </Col>
    </Row>
    <Row>
      <Col span={4}>Priority:</Col>
      <Col span={8}>
        <EditablePriorityTag priorityName={activeCase.priority.name} />
      </Col>
      <Col span={4}>Assigned To:</Col>
      <Col span={8}>
        <EditableAssigneeTag user={activeCase.assignedTo} />
      </Col>
    </Row>
    <Row>
      <Col span={4}>Tags:</Col>
      <Col span={8}>{<EditableTagList tags={activeCase.tags} />}</Col>
    </Row>
  </section>
);

export default DetailsP;
