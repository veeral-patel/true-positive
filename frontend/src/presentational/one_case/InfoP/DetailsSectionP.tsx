import { Col, Divider, Row, Tag } from "antd";
import EditablePriorityTag from "container/shared/priorities/EditablePriorityTag";
import EditableStatusTag from "container/shared/statuses/EditableStatusTag";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
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
        <Tag>
          {activeCase.assignedTo ? activeCase.assignedTo.username : "N/A"}
        </Tag>
      </Col>
    </Row>
    <Row>
      <Col span={4}>Tags:</Col>
      <Col span={8}>{<ListOfTagsP tags={activeCase.tags} />}</Col>
    </Row>
  </section>
);

export default DetailsP;
