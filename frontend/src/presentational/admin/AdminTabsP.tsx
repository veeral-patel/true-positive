import { Tabs, Typography } from "antd";
import React from "react";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

const AdminTabsP: React.FC = () => {
  return (
    <Tabs tabPosition="left">
      <TabPane tab="Customize Statuses" key="statuses">
        <Text>
          <h4>Customize Statuses</h4>
          <Paragraph>
            You can customize the default list of statuses to fit your
            processes. For example, you may switch to a P0/P1/P2 scheme.
          </Paragraph>
        </Text>
      </TabPane>
      <TabPane tab="Customize Priorities" key="priorities"></TabPane>
    </Tabs>
  );
};

export default AdminTabsP;
