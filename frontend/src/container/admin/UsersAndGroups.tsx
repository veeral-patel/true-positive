import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tabs } from "antd";
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
          <Form colon={false} layout="vertical">
            <Form.Item name="name">
              <Input
                placeholder="Create a group"
                prefix={<PlusOutlined />}
                suffix={<ArrowRightOutlined />}
              />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </>
  );
}

export default UsersAndGroups;
