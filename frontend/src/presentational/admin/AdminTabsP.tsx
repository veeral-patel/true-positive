import { Tabs } from "antd";
import CustomizeStatuses from "presentational/admin/CustomizeStatuses";
import React from "react";
import CustomizePriorities from "./CustomizePriorities";

const { TabPane } = Tabs;

const AdminTabsP: React.FC = () => {
  return (
    <Tabs tabPosition="left">
      <TabPane tab="Customize Statuses" key="statuses">
        <CustomizeStatuses />
      </TabPane>
      <TabPane tab="Customize Priorities" key="priorities">
        <CustomizePriorities />
      </TabPane>
    </Tabs>
  );
};

export default AdminTabsP;
