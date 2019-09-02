import { Col, Divider, Row } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
import formatISO8601 from "utils/formatISO8601";
import ListOfTagsP from "../tags/ListOfTagsP";

interface DetailsSectionProps {
  activeIndicator: IIndicator;
}

const DetailsSectionP: React.FC<DetailsSectionProps> = ({
  activeIndicator
}) => (
  <section style={{ lineHeight: 3 }}>
    <Row>
      <Divider orientation="left">Details</Divider>
    </Row>
    <Row>
      <Col span={4}>Created:</Col>
      <Col span={8}>
        {`${formatISO8601(activeIndicator.createdAt)} UTC
           by ${activeIndicator.createdBy.username}`}
      </Col>
    </Row>
    <Row>
      <Col span={4}>Tags:</Col>
      <Col span={16}>
        {activeIndicator.tags.length === 0 ? (
          "N/A"
        ) : (
          <ListOfTagsP tags={activeIndicator.tags} />
        )}
      </Col>
    </Row>
  </section>
);

export default DetailsSectionP;
