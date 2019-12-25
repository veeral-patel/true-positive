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
}

interface UserData {
  users: IUser[];
}

function AssignUserSelect({ handleSelect, onChange, value }: Props) {
  const { loading, error, data } = useQuery<UserData>(GET_USERS);

  // generate a list of options
  var options: Object[] = [];
  if (loading) {
    options = [
      <Option key="loading" value="loading">
        Loading...
      </Option>
    ];
  } else if (data) {
    options = data.users
      .map(user => (
        <Option key={user.username} value={user.username}>
          {user.username}
        </Option>
      ))
      .concat(
        <Option key={NO_ASSIGNED_USER} value={NO_ASSIGNED_USER}>
          N/A
        </Option>
      );
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
      placeholder="Choose a user"
      style={{ minWidth: "200px" }}
      onSelect={userId => handleSelect && handleSelect(userId)}
      onChange={onChange}
      value={value}
    >
      {options}
    </Select>
  );
}

export default AssignUserSelect;
