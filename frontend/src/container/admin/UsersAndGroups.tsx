import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, message, notification, Tabs, Typography } from "antd";
import { ApolloError } from "apollo-boost";
import CREATE_A_GROUP from "mutations/createGroup";
import INVITE_USER from "mutations/inviteUser";
import GET_ALL_USERS from "queries/getAllUsers";
import GET_GROUPS from "queries/getGroups";
import React from "react";
import ListOfGroups from "./ListOfGroups";
import ListOfUsersGivenCategory from "./ListOfUsersGivenCategory";

const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;

function UsersTab() {
  const [inviteUser] = useMutation(INVITE_USER, {
    onCompleted: function() {
      message.success("Invited the user");
    },
    onError: function(error) {
      notification.error({
        message: "Failed to invite the user",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_ALL_USERS }]
  });
  return (
    <>
      <Form
        colon={false}
        layout="vertical"
        onFinish={values =>
          values.emailAddressOfNewUser &&
          inviteUser({
            variables: {
              input: {
                email: values.emailAddressOfNewUser
              }
            }
          })
        }
      >
        <Form.Item
          name="emailAddressOfNewUser"
          rules={[
            {
              type: "email",
              message: "This doesn't look like a valid email address"
            }
          ]}
        >
          <Input
            placeholder="Enter the email address of a user to invite"
            prefix={<PlusOutlined />}
            suffix={<ArrowRightOutlined />}
          />
        </Form.Item>
      </Form>
      <Paragraph>Active</Paragraph>
      <ListOfUsersGivenCategory category="ACTIVE" />
      <br />
      <Paragraph>Disabled</Paragraph>
      <Paragraph type="secondary">Disabled users cannot log in.</Paragraph>
      <ListOfUsersGivenCategory category="DISABLED" />
    </>
  );
}

function GroupsTab() {
  const [groupForm] = Form.useForm();

  const [createGroup] = useMutation(CREATE_A_GROUP, {
    onCompleted: function() {
      message.success("Created the group");
      groupForm.resetFields();
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
        form={groupForm}
        onFinish={values => {
          if (!values.name) return;
          createGroup({
            variables: {
              input: {
                name: values.name
              }
            }
          });
        }}
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
      <Paragraph>Manage users and organize them into groups.</Paragraph>
      <Paragraph type="secondary">
        Then, you can add entire groups to case templates and cases at once.
      </Paragraph>
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
