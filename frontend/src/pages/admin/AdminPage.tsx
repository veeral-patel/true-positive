import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import React from "react";

const { TabPane } = Tabs;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ width: "75%" }}>
        <Tabs tabPosition="left">
          <TabPane tab="Customize Statuses" key="statuses">
            <CustomizeStatuses />
          </TabPane>
          <TabPane tab="Customize Priorities" key="priorities">
            <CustomizePriorities />
          </TabPane>
          {/* <TabPane tab="Templates" key="templates">
            <CustomizeTemplates />
          </TabPane> */}
        </Tabs>
      </div>
    );
  }
}

export default AdminPage;
