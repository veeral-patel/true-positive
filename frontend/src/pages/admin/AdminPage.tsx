import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import CustomizeTemplates from "container/admin/CustomizeTemplates";
import Integrations from "container/admin/Integrations";
import UsersAndGroups from "container/admin/UsersAndGroups";
import SortableTGList from "container/one_case/SortableTGList";
import React from "react";

const { TabPane } = Tabs;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ maxWidth: "900px" }}>
        <Tabs tabPosition="left">
          <TabPane tab="POC" key="poc">
            <SortableTGList />
          </TabPane>
          <TabPane tab="Integrations" key="integrations">
            <Integrations />
          </TabPane>
          <TabPane tab="Users" key="users">
            <UsersAndGroups />
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
