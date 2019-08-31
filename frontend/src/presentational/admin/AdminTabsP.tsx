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
            You can customize the default list of statuses to fit your workflow.
          </Paragraph>
          <Paragraph>
            You might add a "In Review" or a "Blocked" status, for example.
          </Paragraph>
        </Text>
      </TabPane>
      <TabPane tab="Customize Priorities" key="priorities">
        <Text>
          <h4>Customize Priorities</h4>
          <Paragraph>
            You can customize the default list of priorities to fit your
            workflow.
          </Paragraph>
          <Paragraph>
            You could choose a P0/P1/P2 scheme, for example.
          </Paragraph>
        </Text>
      </TabPane>
    </Tabs>
  );
};

export default AdminTabsP;
