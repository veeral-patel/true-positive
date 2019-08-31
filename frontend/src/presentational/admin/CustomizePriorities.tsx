import { Icon, Input, Typography } from "antd";
import ListofPriorities from "container/admin/ListofPriorities";
import React from "react";

const { Paragraph, Text } = Typography;

const HelperText = () => (
  <Text>
    <h4>Customize Priorities</h4>
    <Paragraph>
      You can customize the default list of priorities to fit your workflow.
    </Paragraph>
  </Text>
);

const CustomizePriorities: React.FC = () => (
  <div>
    <HelperText />
    <div style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Enter the name of a priority to create it"
          prefix={<Icon type="plus" />}
          suffix={<Icon type="arrow-right" />}
        />
      </div>
      <ListofPriorities />
    </div>
  </div>
);

export default CustomizePriorities;
