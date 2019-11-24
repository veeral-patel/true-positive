import { Tabs, Typography } from "antd";
import ListofTaskTemplates from "container/admin/ListofTaskTemplates";
import React from "react";

const { Paragraph } = Typography;

const { TabPane } = Tabs;

function CustomizeTemplates() {
  return (
    <>
      <h3>Templates</h3>
      <Tabs defaultActiveKey="task_templates">
        <TabPane key="task_templates" tab="Task Templates">
          <Paragraph>
            Create templates for common tasks here, so you can initialize tasks
            from them later.
          </Paragraph>
          <ListofTaskTemplates />
        </TabPane>
      </Tabs>
    </>
  );
}

export default CustomizeTemplates;
