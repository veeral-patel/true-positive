import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  Form,
  Input,
  List,
  message,
  notification,
  Popconfirm,
  Spin,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import UserSelect from "container/shared/users/UserSelect";
import ADD_USER_TO_GROUP from "mutations/addUserToGroup";
import REMOVE_USER_FROM_GROUP from "mutations/removeUserFromGroup";
import Error from "presentational/shared/errors/Error";
import GET_ONE_GROUP from "queries/getOneGroup";
import React from "react";
import IGroup from "ts/interfaces/IGroup";

const { Paragraph } = Typography;

interface Response {
  group: IGroup;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  groupId: number | null;

  /* Whether this drawer is only for viewing the group, and not for editing it. */
  forViewingOnly?: boolean;
}

function GroupDrawer({
  visible,
  onClose,
  groupId,
  forViewingOnly = false
}: Props) {
  const { loading, error, data } = useQuery<Response>(GET_ONE_GROUP, {
    variables: {
      id: groupId
    }
  });

  const [addUserToGroup] = useMutation(ADD_USER_TO_GROUP, {
    onCompleted: () => {
      message.success("Added user");
    },
    onError: (error: ApolloError) => {
      notification.error({
        message: "Could not add user to the group",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_ONE_GROUP, variables: { id: groupId } }]
  });

  const [removeUserFromGroup] = useMutation(REMOVE_USER_FROM_GROUP, {
    onCompleted: () => {
      message.success("Removed user");
    },
    onError: (error: ApolloError) => {
      notification.error({
        message: "Could not remove user from the group",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_ONE_GROUP, variables: { id: groupId } }]
  });

  let drawerContent: React.ReactNode = null;

  if (loading) drawerContent = <Spin />;
  else if (error) {
    drawerContent = (
      <Error title="Could not retrieve case" subtitle={error.message} />
    );
  } else if (data) {
    drawerContent = (
      <>
        <div>
          <Form
            colon={false}
            layout="vertical"
            initialValues={{ name: data.group.name }}
          >
            <Form.Item label="Name" name="name">
              <Input disabled />
            </Form.Item>
          </Form>
        </div>
        <div>
          <Paragraph>Users ({data.group.userCount})</Paragraph>
          {!forViewingOnly && (
            <Form
              colon={false}
              layout="vertical"
              style={{ display: "flex" }}
              onFinish={values => {
                if (!values.usernames) return; // do nothing if empty input
                values.usernames.forEach((username: string) => {
                  addUserToGroup({
                    variables: {
                      input: {
                        username,
                        groupId: groupId
                      }
                    }
                  });
                });
              }}
            >
              <Form.Item style={{ flex: "80%" }} name="usernames">
                <UserSelect multiple placeholder="Choose users to add" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Add Users</Button>
              </Form.Item>
            </Form>
          )}
          {data.group.userCount === 0 ? (
            <Empty
              description={
                <div style={{ marginTop: "2em" }}>
                  <h3>No users</h3>
                  <Paragraph>Add users to this group above</Paragraph>
                </div>
              }
            />
          ) : (
            <List
              bordered
              dataSource={data.group.users}
              itemLayout="horizontal"
              renderItem={user => (
                <List.Item
                  actions={[
                    !forViewingOnly && (
                      <Popconfirm
                        title="Remove this user?"
                        okText="Yes, Remove"
                        cancelText="No"
                        onConfirm={() =>
                          removeUserFromGroup({
                            variables: {
                              input: {
                                username: user.username,
                                groupId: groupId
                              }
                            }
                          })
                        }
                      >
                        <Button icon={<CloseOutlined />} type="link" />
                      </Popconfirm>
                    )
                  ]}
                >
                  <List.Item.Meta
                    title={user.username}
                    description={user.email}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      width={600}
      title={forViewingOnly ? <h3>Group details</h3> : <h3>Update group</h3>}
    >
      {drawerContent}
    </Drawer>
  );
}

export default GroupDrawer;
