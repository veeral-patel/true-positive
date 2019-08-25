import { Col, Divider, Layout, Row } from "antd";
import "presentational/one_case/InfoP.css";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ReactQuill from "react-quill";
import ICase from "ts/interfaces/ICase";

const { Content } = Layout;

interface InfoProps {
  activeCase: ICase;
}

const Info: React.FC<InfoProps> = ({ activeCase }) => (
  <div>
    <OneCaseBreadcrumb caseName={activeCase.name} tabName="Info" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Info</h2>
      <section style={{ lineHeight: 3 }}>
        <Row>
          <Col span={16}>
            <Divider orientation="left">Details</Divider>
          </Col>
        </Row>
        <Row>
          <Col span={4}>Status:</Col>
          <Col span={4}>
            <StatusTagP statusName={activeCase.status.name} />
          </Col>
          <Col span={4}>Created:</Col>
          <Col span={4}>
            {`${activeCase.formattedCreatedAt} by ${
              activeCase.createdBy.username
            }`}
          </Col>
        </Row>
        <Row>
          <Col span={4}>Priority:</Col>
          <Col span={4}>
            <PriorityTagP priorityName={activeCase.priority.name} />
          </Col>
          <Col span={4}>Assigned To:</Col>
          <Col span={4}>
            {activeCase.assignedTo ? activeCase.assignedTo.username : "N/A"}
          </Col>
        </Row>
        <Row>
          <Col span={4}>Tags:</Col>
          <Col span={12}>{<ListOfTagsP tags={activeCase.tags} />}</Col>
        </Row>
      </section>
      <section>
        <Row>
          <Col span={16}>
            <Divider orientation="left">Description</Divider>
            <ReactQuill value={activeCase.description} />
          </Col>
        </Row>
      </section>
    </Content>
  </div>
);

export default Info;
