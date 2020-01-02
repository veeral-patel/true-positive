import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Empty,
  List,
  message,
  notification,
  Popconfirm,
  Spin
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { ApolloError } from "apollo-boost";
import DELETE_A_GROUP from "mutations/deleteGroup";
import Error from "presentational/shared/errors/Error";
import GET_GROUPS from "queries/getGroups";
import React, { useState } from "react";
import IGroup from "ts/interfaces/IGroup";
import GroupDrawer from "./GroupDrawer";

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

  // Used to render a drawer listing a group's users after clicking on a group
  const [idOfActiveGroup, setIdOfActiveGroup] = useState<number | null>(null);

  if (loading) return <Spin />;
  else if (error) {
    return <Error title="Could not fetch users" subtitle={error.message} />;
  } else if (data) {
    const numberOfGroups = data.groups.length;
    if (numberOfGroups === 0) {
      return (
        <Empty
          description={
            <div>
              <h3>No groups</h3>
              <Paragraph>
                Organize your users into groups, like "AppSec" or "Malware
                Analysts"
              </Paragraph>
            </div>
          }
        />
      );
    }
    return (
      <>
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
                title={
                  <a onClick={() => setIdOfActiveGroup(group.id)}>
                    {group.name}
                  </a>
                }
                description={`${group.userCount} users`}
              ></List.Item.Meta>
            </List.Item>
          )}
        />
        <GroupDrawer
          visible={idOfActiveGroup !== null}
          onClose={() => setIdOfActiveGroup(null)}
          groupId={idOfActiveGroup}
        />
      </>
    );
  }
  return null;
}

export default ListOfGroups;
