import { Button, Tabs } from "antd";
import ListOfUsers from "container/admin/ListOfUsers";
import React from "react";

const { TabPane } = Tabs;

function UsersAndGroups() {
  return (
    <>
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
    </>
  );
}

export default UsersAndGroups;
