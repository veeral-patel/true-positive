import { Col, Divider, Empty, Layout, Row, Typography } from "antd";
import DetailsSectionP from "presentational/one_case/InfoP/DetailsSectionP";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import CommentList from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import React from "react";
import ICase from "ts/interfaces/ICase";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";
import ListofMergedCasesP from "../ListofMergedCasesP";

const { Content } = Layout;
const { Text } = Typography;

interface InfoProps {
  activeCase: ICase;
}

const Info: React.FC<InfoProps> = ({ activeCase }) => (
  <div>
    <OneCaseBreadcrumb caseName={activeCase.name} tabName="Info" />
    <div style={{ display: "flex" }}>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280,
          flex: 3
        }}
      >
        <h2>Info</h2>
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
              <CommentList
                comments={sortCommentsByCreatedAt(activeCase.comments)}
              />
            </Col>
          </Row>
        </section>
        {activeCase.mergedCases.length === 0 ? (
          <span />
        ) : (
          <section>
            <Divider orientation="left">
              Merged Cases ({activeCase.mergedCases.length})
            </Divider>
            <Text>
              {activeCase.mergedCases.length} case(s) have been merged into this
              case.
            </Text>
            <ListofMergedCasesP mergedCases={activeCase.mergedCases} />
          </section>
        )}
      </Content>
      <Content
        style={{
          backgroundColor: "#fff",
          padding: 24,
          marginLeft: 24,
          flex: 1
        }}
      >
        <Text type="secondary" style={{ textTransform: "uppercase" }}>
          Activity
        </Text>
        <Empty />
      </Content>
    </div>
  </div>
);

export default Info;
