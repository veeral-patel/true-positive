import { useQuery } from "@apollo/react-hooks";
import { Drawer, Empty, Form, Input, List, Spin } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React from "react";
import IGroup from "ts/interfaces/IGroup";

const GET_ONE_GROUP = gql`
  query getOneGroup($id: ID!) {
    group(id: $id) {
      id
      name
      userCount
      users {
        username
        email
      }
    }
  }
`;

interface Response {
  group: IGroup;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  groupId: number | null;
}

function GroupDrawer({ visible, onClose, groupId }: Props) {
  const { loading, error, data } = useQuery<Response>(GET_ONE_GROUP, {
    variables: {
      id: groupId
    }
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
              <Input placeholder="AppSec" disabled />
            </Form.Item>
          </Form>
        </div>
        <div>
          <Paragraph>Users ({data.group.userCount})</Paragraph>
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
              pagination={{ position: "bottom" }}
              renderItem={user => (
                <List.Item>
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
      title={<h3>Update group</h3>}
    >
      {drawerContent}
    </Drawer>
  );
}

export default GroupDrawer;
