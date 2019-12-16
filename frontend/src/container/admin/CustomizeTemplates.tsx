import { Tabs } from "antd";
import CustomizeCaseTemplates from "container/admin/CustomizeCaseTemplates";
import CustomizeTaskTemplates from "container/admin/CustomizeTaskTemplates";
import React from "react";

const { TabPane } = Tabs;

function CustomizeTemplates() {
  return (
    <>
      <h3>Templates</h3>
      <Tabs defaultActiveKey="case_templates">
        <TabPane key="case_templates" tab="Case Templates">
          <CustomizeCaseTemplates />
        </TabPane>
        <TabPane key="task_templates" tab="Task Templates">
          <CustomizeTaskTemplates />
        </TabPane>
      </Tabs>
    </>
  );
}

export default CustomizeTemplates;
