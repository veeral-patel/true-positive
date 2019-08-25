import { Col, Divider, Layout, Row, Typography } from "antd";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import CommentList from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ICase from "ts/interfaces/ICase";

const { Content } = Layout;
const { Text } = Typography;

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
        minHeight: 280,
        width: "70%",
        float: "left"
      }}
    >
      <h2>Info</h2>
      <section style={{ lineHeight: 3 }}>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Details</Divider>
          </Col>
        </Row>
        <Row>
          <Col span={4}>Status:</Col>
          <Col span={8}>
            <StatusTagP statusName={activeCase.status.name} />
          </Col>
          <Col span={4}>Created:</Col>
          <Col span={8}>
            {`${activeCase.formattedCreatedAt} by ${
              activeCase.createdBy.username
            }`}
          </Col>
        </Row>
        <Row>
          <Col span={4}>Priority:</Col>
          <Col span={8}>
            <PriorityTagP priorityName={activeCase.priority.name} />
          </Col>
          <Col span={4}>Assigned To:</Col>
          <Col span={8}>
            {activeCase.assignedTo ? activeCase.assignedTo.username : "N/A"}
          </Col>
        </Row>
        <Row>
          <Col span={4}>Tags:</Col>
          <Col span={20}>{<ListOfTagsP tags={activeCase.tags} />}</Col>
        </Row>
      </section>
      <section>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Description</Divider>
            <DescriptionP description={activeCase.description} />
          </Col>
        </Row>
      </section>
      <section>
        <Row>
          <Col span={24}>
            <Divider orientation="left">
              Comments ({activeCase.comments.length})
            </Divider>
            <CommentList comments={activeCase.comments} />
          </Col>
        </Row>
      </section>
    </Content>
    <Content
      style={{
        width: "28%",
        float: "right",
        backgroundColor: "#fff",
        padding: 24,
        minHeight: 280,
        marginLeft: 24
      }}
    >
      <Text type="secondary" style={{ textTransform: "uppercase" }}>
        Activity
      </Text>
    </Content>
  </div>
);

export default Info;
