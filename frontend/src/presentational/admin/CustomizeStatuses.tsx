import { Icon, Input, Tabs, Typography } from "antd";
import ListofStatuses from "container/admin/ListofStatuses";
import React from "react";

const { TabPane } = Tabs;
const { Paragraph, Text } = Typography;

const HelperText = () => (
  <Text>
    <h4>Customize Statuses</h4>
    <Paragraph>
      You can customize the default list of statuses to fit your workflow.
    </Paragraph>
    <Paragraph>
      You might add a "In Review" or a "Blocked" status, for example.
    </Paragraph>
  </Text>
);

const CustomizeStatuses: React.FC = () => (
  <div>
    <HelperText />
    <div style={{ marginTop: "20px" }}>
      <div>
        <Input
          placeholder="Enter the name of a status to create it"
          prefix={<Icon type="plus" />}
          suffix={<Icon type="arrow-right" />}
        />
      </div>
      <ListofStatuses />
    </div>
  </div>
);

export default CustomizeStatuses;
