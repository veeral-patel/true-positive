import { RouteComponentProps } from "@reach/router";
import { Button, Modal, Steps, Tabs, Typography } from "antd";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import CustomizeTemplates from "container/admin/CustomizeTemplates";
import UsersAndGroups from "container/admin/UsersAndGroups";
import React from "react";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div style={{ maxWidth: "900px" }}>
        <Tabs tabPosition="left">
          <TabPane tab="Integrations" key="integrations">
            <h3>Integrations</h3>
            <Paragraph>Create cases from inbound email</Paragraph>
            <Paragraph type="secondary">
              True Positive can ingest and create cases from emails sent to a
              mailbox, such as phishing@ecorp.com.
            </Paragraph>
            <Paragraph type="secondary">
              Simply generate a random @tp.app email address and forward email
              from your existing mailbox to this address.
            </Paragraph>
            <Button type="link" style={{ padding: "0px" }}>
              Set up a mailbox
            </Button>
            <Modal visible={true} title="Set up a mailbox" footer={null}>
              <Steps size="small" progressDot>
                <Steps.Step title="Generate an inbound email address"></Steps.Step>
                <Steps.Step title="Choose a case template"></Steps.Step>
                <Steps.Step title="Forward email from an existing mailbox"></Steps.Step>
              </Steps>
            </Modal>
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
