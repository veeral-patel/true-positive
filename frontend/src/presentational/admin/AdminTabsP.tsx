import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

const AdminTabsP: React.FC = () => {
  return (
    <Tabs tabPosition="left">
      <TabPane tab="Customize Statuses" key="statuses"></TabPane>
      <TabPane tab="Customize Priorities" key="priorities"></TabPane>
    </Tabs>
  );
};

export default AdminTabsP;
