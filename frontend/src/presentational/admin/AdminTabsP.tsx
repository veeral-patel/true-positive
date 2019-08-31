import { Tabs, Typography } from "antd";
import ListofPriorities from "container/admin/ListofPriorities";
import CustomizeStatuses from "presentational/admin/CustomizeStatuses";
import React from "react";

const { TabPane } = Tabs;
const { Paragraph, Text } = Typography;

const AdminTabsP: React.FC = () => {
  return (
    <Tabs tabPosition="left">
      <TabPane tab="Customize Statuses" key="statuses">
        <CustomizeStatuses />
      </TabPane>
      <TabPane tab="Customize Priorities" key="priorities">
        <div>
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
          <ListofPriorities />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default AdminTabsP;
