import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import CustomizeTemplates from "container/admin/CustomizeTemplates";
import React from "react";

const { TabPane } = Tabs;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ width: "75%" }}>
        <Tabs tabPosition="left">
          {/* <TabPane tab="Forms" key="forms">
            <CustomizeForms />
          </TabPane> */}
          <TabPane tab="Users" key="users">
            <h3>Users</h3>
            <Tabs defaultActiveKey="users">
              <TabPane key="users" tab="Users"></TabPane>
              <TabPane key="groups" tab="Groups"></TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Templates" key="templates">
            <CustomizeTemplates />
          </TabPane>
          <TabPane tab="Customize Statuses" key="statuses">
            <CustomizeStatuses />
          </TabPane>
          <TabPane tab="Customize Priorities" key="priorities">
            <CustomizePriorities />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default AdminPage;
