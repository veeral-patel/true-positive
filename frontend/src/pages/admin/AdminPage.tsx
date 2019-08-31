import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div>
        <div style={{ marginBottom: "25px" }}>
          <h2>Admin</h2>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Tabs tabPosition="left">
              <TabPane tab="Customize Statuses" key="statuses"></TabPane>
              <TabPane tab="Customize Priorities" key="priorities"></TabPane>
            </Tabs>
          </div>
          <div style={{ flex: 5 }}>Content</div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
