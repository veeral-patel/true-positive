import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd";
import CustomizeCaseTemplates from "container/admin/CustomizeCaseTemplates";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import Integrations from "container/admin/Integrations";
import UsersAndGroups from "container/admin/UsersAndGroups";
import React from "react";

const { TabPane } = Tabs;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ maxWidth: "900px" }}>
        <Tabs tabPosition="left">
          <TabPane tab="Integrations" key="integrations">
            <Integrations />
          </TabPane>
          <TabPane tab="Users" key="users">
            <UsersAndGroups />
          </TabPane>
          <TabPane tab="Case Templates" key="case_templates">
            <CustomizeCaseTemplates />
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
