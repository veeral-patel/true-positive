import { RouteComponentProps } from "@reach/router";
import { Tabs, Typography } from "antd";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import CustomizeTemplates from "container/admin/CustomizeTemplates";
import Integrations from "container/admin/Integrations";
import UsersAndGroups from "container/admin/UsersAndGroups";
import React from "react";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ maxWidth: "900px" }}>
        <Tabs tabPosition="left">
          {/* <TabPane tab="Webhooks" key="webhooks">
            <Webhooks />
          </TabPane> */}
          <TabPane tab="Integrations" key="integrations">
            <Integrations />
          </TabPane>
          <TabPane tab="Users & Groups" key="users_and_groups">
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
