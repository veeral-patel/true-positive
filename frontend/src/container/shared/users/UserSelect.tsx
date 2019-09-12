import { Empty, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useQuery } from "models";
import React from "react";

const { Option } = Select;

const UserSelect = observer(() => {
  // fetch the list of users
  const { data, loading, error } = useQuery(store => store.queryUsers());

  // handle loading and error statuses
  if (loading) return <Spin />;
  if (error || !data) return <Empty />;

  // generate a list of options
  const options = data.users.map(user => (
    <Option key={user.id}>{user.username}</Option>
  ));

  // render our component
  return (
    <Select
      showSearch
      placeholder="Choose a user"
      style={{ minWidth: "200px" }}
    >
      {options}
    </Select>
  );
});

export default UserSelect;
