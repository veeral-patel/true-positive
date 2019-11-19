import { RouteComponentProps } from "@reach/router";
import { Tabs, Typography } from "antd";
import CustomizePriorities from "presentational/admin/CustomizePriorities";
import CustomizeStatuses from "presentational/admin/CustomizeStatuses";
import React from "react";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ width: "70%" }}>
        <Tabs tabPosition="left">
          <TabPane tab="Customize Statuses" key="statuses">
            <CustomizeStatuses />
          </TabPane>
          <TabPane tab="Customize Priorities" key="priorities">
            <CustomizePriorities />
          </TabPane>
          {/* <TabPane tab="Task Templates" key="task_templates">
            <h3>Task Templates</h3>
          </TabPane> */}
        </Tabs>
      </div>
    );
  }
}

export default AdminPage;
