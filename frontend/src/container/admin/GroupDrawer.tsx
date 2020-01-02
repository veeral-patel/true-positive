import { useQuery } from "@apollo/react-hooks";
import { Drawer, Form, Input, Spin } from "antd";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React from "react";
import IGroup from "ts/interfaces/IGroup";

const GET_ONE_GROUP = gql`
  query getOneGroup($id: ID!) {
    group(id: $id) {
      id
      name
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
      <Form
        colon={false}
        layout="vertical"
        initialValues={{ name: data.group.name }}
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="AppSec" />
        </Form.Item>
      </Form>
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
