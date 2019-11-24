import { Tabs, Typography } from "antd";
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
            quickly later.
          </Paragraph>
        </TabPane>
      </Tabs>
    </>
  );
}

export default CustomizeTemplates;
