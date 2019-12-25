import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form, Input, message, notification, Tabs } from "antd";
import { ApolloError } from "apollo-boost";
import ListOfUsers from "container/admin/ListOfUsers";
import CREATE_A_GROUP from "mutations/createGroup";
import GET_GROUPS from "queries/getGroups";
import React from "react";
import ListOfGroups from "./ListOfGroups";

const { TabPane } = Tabs;

function UsersAndGroups() {
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
        </TabPane>
      </Tabs>
    </>
  );
}

export default UsersAndGroups;
