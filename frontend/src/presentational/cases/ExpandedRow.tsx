import { Typography } from "antd";
import React from "react";

const { Paragraph } = Typography;

interface IExpandedRowProps {
  description: string;
}

const ExpandedRow: React.FC<IExpandedRowProps> = ({ description }) => (
  <Paragraph style={{ margin: "0px" }}>{description}</Paragraph>
);

export default ExpandedRow;
