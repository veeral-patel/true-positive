import { useQuery } from "@apollo/react-hooks";
import { Select } from "antd";
import GET_GROUPS from "queries/getGroups";
import React from "react";
import IGroup from "ts/interfaces/IGroup";

const { Option } = Select;

interface Props {
  handleSelect?: (groupId: any) => void;
  onChange?: (value: any) => void;
  value?: any;

  /* Whether to allow choosing multiple groups. */
  multiple?: boolean;

  /* To override the select component's placeholder. */
  placeholder?: string;
}

interface GroupData {
  groups: IGroup[];
}

function GroupSelect({
  handleSelect,
  onChange,
  value,
  multiple = false,
  placeholder = "Choose a group"
}: Props) {
  const { loading, data } = useQuery<GroupData>(GET_GROUPS);

  // generate a list of options
  var options: Object[] = [];
  if (loading) {
    options = [
      <Option key="loading" value="loading">
        Loading...
      </Option>
    ];
  } else if (data) {
    options = data.groups.map(group => (
      <Option key={group.id} value={group.id}>
        {group.name}
      </Option>
    ));
  } else {
    options = [
      <Option key="error" value="error">
        Error loading groups
      </Option>
    ];
  }

  // render our component
  return (
    <Select
      showSearch
      placeholder={placeholder}
      style={{ minWidth: "200px" }}
      onSelect={groupId => handleSelect && handleSelect(groupId)}
      onChange={onChange}
      value={value}
      mode={multiple ? "multiple" : undefined}
    >
      {options}
    </Select>
  );
}

export default GroupSelect;
