import { RouteComponentProps } from "@reach/router";
import { Button, Tabs, Typography } from "antd";
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
          <TabPane tab="Webhooks" key="webhooks">
            <h3>Webhooks</h3>
            <Tabs defaultActiveKey="inboundWebhooks">
              <Tabs.TabPane key="inboundWebhooks" tab="Inbound">
                <Paragraph type="secondary">
                  Create an inbound webhook so True Positive can create cases
                  when events happen in an external tool.
                </Paragraph>
                <Button type="link" style={{ padding: "0px" }}>
                  Create a webhook
                </Button>
              </Tabs.TabPane>
              <Tabs.TabPane key="outboundWebhooks" tab="Outbound">
                <Paragraph type="secondary">
                  Create an outbound webhook to notify an external tool when
                  events happen in True Positive.
                </Paragraph>
                <Button type="link" style={{ padding: "0px" }}>
                  Create a webhook
                </Button>
              </Tabs.TabPane>
            </Tabs>
          </TabPane>
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
