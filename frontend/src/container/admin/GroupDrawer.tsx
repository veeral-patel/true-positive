import { useQuery } from "@apollo/react-hooks";
import { Drawer, Spin } from "antd";
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

interface Props {
  visible: boolean;
  onClose: () => void;
  groupId: number | null;
}

function GroupDrawer({ visible, onClose, groupId }: Props) {
  const { loading, error, data } = useQuery<IGroup>(GET_ONE_GROUP, {
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
    drawerContent = null;
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
