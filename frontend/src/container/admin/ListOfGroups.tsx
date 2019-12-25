import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, List, message, notification, Popconfirm, Spin } from "antd";
import { ApolloError } from "apollo-boost";
import DELETE_A_GROUP from "mutations/deleteGroup";
import Error from "presentational/shared/errors/Error";
import GET_GROUPS from "queries/getGroups";
import React from "react";
import IGroup from "ts/interfaces/IGroup";

interface GroupData {
  groups: IGroup[];
}

function ListOfGroups() {
  const { loading, error, data } = useQuery<GroupData>(GET_GROUPS);
  const [deleteGroup] = useMutation(DELETE_A_GROUP, {
    onCompleted: function() {
      message.success("Deleted the group");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete the group",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_GROUPS }]
  });

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
                onConfirm={() =>
                  deleteGroup({
                    variables: {
                      input: {
                        id: group.id
                      }
                    }
                  })
                }
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
