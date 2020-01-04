import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, Empty, List, Popconfirm, Spin } from "antd";
import Error from "presentational/shared/errors/Error";
import GET_USERS from "queries/getUsers";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface UserData {
  users: IUser[];
}

interface Props {
  category: "ACTIVE" | "DISABLED";
}

function ListOfUsersGivenCategory({ category }: Props) {
  const { loading, error, data } = useQuery<UserData>(GET_USERS);
  if (loading) return <Spin />;
  else if (error) {
    return <Error title="Could not fetch users" subtitle={error.message} />;
  } else if (data) {
    // Filter the users based on the category provided in props
    var filteredUsers: IUser[] = [];

    if (category === "ACTIVE") {
      filteredUsers = data.users.filter(user => !user.disabled);
    } else if (category === "DISABLED") {
      filteredUsers = data.users.filter(user => user.disabled);
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
