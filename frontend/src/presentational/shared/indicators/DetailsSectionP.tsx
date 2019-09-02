import { Divider, Row } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

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
  </section>
);

export default DetailsSectionP;
