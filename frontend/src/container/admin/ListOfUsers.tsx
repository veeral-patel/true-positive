import { useQuery } from "@apollo/react-hooks";
import { List, Spin } from "antd";
import Error from "presentational/shared/errors/Error";
import GET_USERS from "queries/getUsers";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface UserData {
  users: IUser[];
}

function ListOfUsers() {
  const { loading, error, data } = useQuery<UserData>(GET_USERS);
  if (loading) return <Spin />;
  else if (error) {
    return <Error title="Could not fetch users" subtitle={error.message} />;
  } else if (data) {
    return (
      <List
        bordered
        dataSource={data.users}
        itemLayout="horizontal"
        pagination={{ position: "bottom" }}
        renderItem={user => (
          <List.Item>
            <List.Item.Meta title={user.username} description={user.email} />
          </List.Item>
        )}
      />
    );
  }
  return null;
}

export default ListOfUsers;
