import { Tabs } from "antd";
import CustomizeTaskTemplates from "container/admin/CustomizeTaskTemplates";
import React from "react";

const { TabPane } = Tabs;

function CustomizeTemplates() {
  return (
    <>
      <h3>Templates</h3>
      <Tabs defaultActiveKey="task_templates">
        <TabPane key="task_templates" tab="Task Templates">
          <CustomizeTaskTemplates />
        </TabPane>
        <TabPane key="case_templates" tab="Case Templates"></TabPane>
      </Tabs>
    </>
  );
}

export default CustomizeTemplates;
