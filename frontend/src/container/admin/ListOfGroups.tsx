import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, List, Popconfirm, Spin } from "antd";
import Error from "presentational/shared/errors/Error";
import GET_GROUPS from "queries/getGroups";
import React from "react";
import IGroup from "ts/interfaces/IGroup";

interface GroupData {
  groups: IGroup[];
}

function ListOfGroups() {
  const { loading, error, data } = useQuery<GroupData>(GET_GROUPS);
  if (loading) return <Spin />;
  else if (error) {
    return <Error title="Could not fetch users" subtitle={error.message} />;
  } else if (data) {
    return (
      <List
        bordered
        dataSource={data.groups}
        itemLayout="horizontal"
        pagination={{ position: "bottom" }}
        renderItem={group => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this group?"
                okText="Yes, Delete"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} type="link" />
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={group.name}
              description={`${group.userCount} users`}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    );
  }
  return null;
}

export default ListOfGroups;
