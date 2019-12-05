import { Typography } from "antd";
import React from "react";
const { Text } = Typography;

function Heading({ heading }: { heading: string }) {
  return (
    <div style={{ marginBottom: "0.75em", marginTop: "2.25em" }}>
      <Text type="secondary" style={{ textTransform: "uppercase" }} editable>
        {heading}
      </Text>
    </div>
  );
}

export default Heading;
