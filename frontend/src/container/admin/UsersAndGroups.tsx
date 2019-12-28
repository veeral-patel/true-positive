import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, message, notification, Tabs } from "antd";
import { ApolloError } from "apollo-boost";
import ListOfUsers from "container/admin/ListOfUsers";
import CREATE_A_GROUP from "mutations/createGroup";
import GET_GROUPS from "queries/getGroups";
import React from "react";
import ListOfGroups from "./ListOfGroups";

const { TabPane } = Tabs;

function UsersTab() {
  return (
    <>
      <Form colon={false} layout="vertical">
        <Form.Item name="email_address_of_new_user">
          <Input
            placeholder="Enter the email address of a user to invite"
            prefix={<PlusOutlined />}
            suffix={<ArrowRightOutlined />}
          />
        </Form.Item>
      </Form>
      <ListOfUsers />
    </>
  );
}

function GroupsTab() {
  const [createGroup] = useMutation(CREATE_A_GROUP, {
    onCompleted: function() {
      message.success("Created the group");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not create the group",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_GROUPS }]
  });

  return (
    <>
      <Form
        colon={false}
        layout="vertical"
        onFinish={values =>
          createGroup({
            variables: {
              input: {
                name: values.name
              }
            }
          })
        }
      >
        <Form.Item name="name">
          <Input
            placeholder="Create a group"
            prefix={<PlusOutlined />}
            suffix={<ArrowRightOutlined />}
          />
        </Form.Item>
      </Form>
      <ListOfGroups />
    </>
  );
}

function UsersAndGroups() {
  return (
    <>
      <h3>Users & Groups</h3>
      <Tabs defaultActiveKey="users">
        <TabPane key="users" tab="Users">
          <UsersTab />
        </TabPane>
        <TabPane key="groups" tab="Groups">
          <GroupsTab />
        </TabPane>
      </Tabs>
    </>
  );
}

export { UsersTab };
export default UsersAndGroups;
