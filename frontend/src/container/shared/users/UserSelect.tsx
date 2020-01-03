import { useQuery } from "@apollo/react-hooks";
import { Select } from "antd";
import GET_USERS from "queries/getUsers";
import React from "react";
import IUser from "ts/interfaces/IUser";
import { NO_ASSIGNED_USER } from "utils/constants";

const { Option } = Select;

interface Props {
  handleSelect?: (userId: any) => void;
  onChange?: (value: any) => void;
  value?: any;

  /* Whether this select is for assigning a user to something. If so, we include a N/A option. */
  forAssigning?: boolean;

  /* Whether to allow choosing multiple users. */
  multiple?: boolean;

  /* To override the select component's placeholder. */
  placeholder?: string;
}

interface UserData {
  users: IUser[];
}

function UserSelect({
  handleSelect,
  onChange,
  value,
  forAssigning = false,
  multiple = false,
  placeholder = "Choose a user"
}: Props) {
  const { loading, data } = useQuery<UserData>(GET_USERS);

  // generate a list of options
  var options: Object[] = [];
  if (loading) {
    options = [
      <Option key="loading" value="loading">
        Loading...
      </Option>
    ];
  } else if (data) {
    options = data.users.map(user => (
      <Option key={user.username} value={user.username}>
        {user.username}
      </Option>
    ));
    if (forAssigning) {
      options = options.concat(
        <Option key={NO_ASSIGNED_USER} value={NO_ASSIGNED_USER}>
          N/A
        </Option>
      );
    }
  } else {
    options = [
      <Option key="error" value="error">
        Error loading users
      </Option>
    ];
  }

  // render our component
  return (
    <Select
      showSearch
      placeholder={placeholder}
      style={{ minWidth: "200px" }}
      onSelect={userId => handleSelect && handleSelect(userId)}
      onChange={onChange}
      value={value}
      mode={multiple ? "multiple" : undefined}
    >
      {options}
    </Select>
  );
}

export default UserSelect;
