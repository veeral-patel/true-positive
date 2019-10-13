import { RouteComponentProps } from "@reach/router";
import { PageHeader, Tabs } from "antd";
import CustomizePriorities from "presentational/admin/CustomizePriorities";
import CustomizeStatuses from "presentational/admin/CustomizeStatuses";
import React from "react";

const { TabPane } = Tabs;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div>
        <PageHeader
          title="Manage"
          subTitle="Customize settings that affect all users"
        />
        <div style={{ width: "60%" }}>
          <Tabs tabPosition="left">
            <TabPane tab="Customize Statuses" key="statuses">
              <CustomizeStatuses />
            </TabPane>
            <TabPane tab="Customize Priorities" key="priorities">
              <CustomizePriorities />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default AdminPage;
