import { Avatar, Col, Comment, Divider, Layout, Row, Typography } from "antd";
import ActionsDropdown from "container/one_case/ActionsDropdown";
import DetailsSectionP from "container/one_case/Info/DetailsSection";
import AddCommentFormP from "presentational/one_case/InfoP/AddCommentFormP";
import ListofMergedCasesP from "presentational/one_case/ListofMergedCasesP";
import CommentList from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import React from "react";
import ICase from "ts/interfaces/ICase";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { Content } = Layout;
const { Text } = Typography;

interface InfoProps {
  activeCase: ICase;
}

const Info: React.FC<InfoProps> = ({ activeCase }) => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <section>
      <div style={{ display: "inline-block" }}>
        <h2>Info</h2>
      </div>
      <div style={{ display: "inline-block", float: "right" }}>
        <ActionsDropdown caseId={activeCase.id} />
      </div>
    </section>

    <DetailsSectionP activeCase={activeCase} />

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
          {activeCase.comments.length > 0 && (
            <CommentList
              comments={sortCommentsByCreatedAt(activeCase.comments)}
            />
          )}
          <div style={{ width: "70%" }}>
            <Comment
              content={<AddCommentFormP />}
              avatar={<Avatar icon="user" />}
            />
          </div>
        </Col>
      </Row>
    </section>

    {activeCase.mergedCases.length > 0 && (
      <section>
        <Divider orientation="left">
          Merged Cases ({activeCase.mergedCases.length})
        </Divider>
        <Text>
          {activeCase.mergedCases.length} case(s) have been merged into this
          case.
        </Text>
        <div style={{ marginTop: "15px" }}>
          <ListofMergedCasesP mergedCases={activeCase.mergedCases} />
        </div>
      </section>
    )}
  </Content>
);

export default Info;
