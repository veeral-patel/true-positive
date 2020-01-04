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
import DISABLE_USER from "mutations/disableUser";
import Error from "presentational/shared/errors/Error";
import GET_ALL_USERS from "queries/getAllUsers";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface UserData {
  allUsers: IUser[];
}

interface Props {
  category: "ACTIVE" | "DISABLED";
}

function ListOfUsersGivenCategory({ category }: Props) {
  const { loading, error, data } = useQuery<UserData>(GET_ALL_USERS);

  const [disableUser] = useMutation(DISABLE_USER, {
    onCompleted: function() {
      message.success("Disabled the user");
    },
    onError: function(error) {
      notification.error({
        message: "Could not disable the user",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_ALL_USERS }]
  });

  if (loading) return <Spin />;
  else if (error) {
    return <Error title="Could not fetch users" subtitle={error.message} />;
  } else if (data) {
    // Filter the users based on the category provided in props
    var filteredUsers: IUser[] = [];

    if (category === "ACTIVE") {
      filteredUsers = data.allUsers.filter(user => !user.disabled);
    } else if (category === "DISABLED") {
      filteredUsers = data.allUsers.filter(user => user.disabled);
    }

    if (filteredUsers.length === 0)
      return (
        <Empty
          description={
            <div>
              <h4>No users</h4>
              {category === "ACTIVE"
                ? "Invite users above."
                : "You can disable users above. Disabled users cannot log in."}
            </div>
          }
        />
      );

    return (
      <List
        bordered
        dataSource={filteredUsers}
        itemLayout="horizontal"
        pagination={{ position: "bottom" }}
        renderItem={user => (
          <List.Item
            actions={[
              category === "ACTIVE" && (
                <Popconfirm
                  title="Disable this user?"
                  okText="Yes, Disable"
                  cancelText="No"
                  onConfirm={() =>
                    disableUser({
                      variables: {
                        input: {
                          username: user.username
                        }
                      }
                    })
                  }
                >
                  <Button icon={<DeleteOutlined />} type="link" />
                </Popconfirm>
              )
            ]}
          >
            <List.Item.Meta title={user.username} description={user.email} />
          </List.Item>
        )}
      />
    );
  }
  return null;
}

export default ListOfUsersGivenCategory;
