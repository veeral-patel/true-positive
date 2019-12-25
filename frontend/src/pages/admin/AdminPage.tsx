import { RouteComponentProps } from "@reach/router";
import { Button, Tabs } from "antd";
import CustomizePriorities from "container/admin/CustomizePriorities";
import CustomizeStatuses from "container/admin/CustomizeStatuses";
import CustomizeTemplates from "container/admin/CustomizeTemplates";
import ListOfUsers from "container/admin/ListOfUsers";
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
          <TabPane tab="Users & Groups" key="users_and_groups">
            <h3>Users & Groups</h3>
            <Tabs defaultActiveKey="users">
              <TabPane key="users" tab="Users">
                <div>
                  <Button type="link" style={{ padding: 0 }}>
                    Invite an user
                  </Button>
                </div>
                <br />
                <ListOfUsers />
              </TabPane>
              <TabPane key="groups" tab="Groups">
                <Button type="link" style={{ padding: 0 }}>
                  Create a group
                </Button>
              </TabPane>
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
