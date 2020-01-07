import { useQuery } from "@apollo/react-hooks";
import { Button, Form, Select } from "antd";
import GET_GROUPS from "queries/getGroups";
import GET_USERS from "queries/getUsers";
import React from "react";
import IGroup from "ts/interfaces/IGroup";
import IUser from "ts/interfaces/IUser";

const { Option, OptGroup } = Select;

interface UserData {
  users: IUser[];
}

interface GroupData {
  groups: IGroup[];
}

interface Props {
  handleFinish: (usernames: string[], groupIds: string[]) => void;
}

function AddMembersForm2({ handleFinish }: Props) {
  const userPrefix = "user234";
  const groupPrefix = "group236";
  const delimiter = "+*()(@)";

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError
  } = useQuery<UserData>(GET_USERS);

  var userOptions: React.ReactNode[] = [];
  if (usersLoading) {
    userOptions = [
      <Option value="loading" key="loading">
        Loading
      </Option>
    ];
  } else if (usersError) {
    userOptions = [
      <Option value="error" key="error">
        Error loading users
      </Option>
    ];
  } else if (usersData) {
    userOptions = usersData.users.map(user => (
      <Option
        key={user.username}
        value={`${userPrefix}${delimiter}${user.username}`}
      >
        {user.username}
      </Option>
    ));
  }

  const {
    data: groupsData,
    loading: groupsLoading,
    error: groupsError
  } = useQuery<GroupData>(GET_GROUPS);

  var groupOptions: React.ReactNode[] = [];
  if (groupsLoading) {
    groupOptions = [
      <Option value="loading" key="loading">
        Loading
      </Option>
    ];
  } else if (groupsError) {
    groupOptions = [
      <Option value="error" key="error">
        Error loading groups
      </Option>
    ];
  } else if (groupsData) {
    groupOptions = groupsData.groups.map(group => (
      <Option key={group.id} value={`${groupPrefix}${delimiter}${group.id}`}>
        {group.name}
      </Option>
    ));
  }

  return (
    <Form
      colon={false}
      layout="vertical"
      style={{ display: "flex" }}
      onFinish={values => {
        if (!values.members) return; // ignore empty input

        var listOfUsernames: string[] = [];
        var listOfGroupIds: string[] = [];

        values.members.map((member: string) => {
          // Add each username to the list of usernames
          if (member.startsWith(userPrefix)) {
            const username = member.split(delimiter)[1];
            listOfUsernames = listOfUsernames.concat(username);
          }

          // Add each group to the list of groups
          else if (member.startsWith(groupPrefix)) {
            const groupId = member.split(delimiter)[1];
            listOfGroupIds = listOfGroupIds.concat(groupId);
          }
        });

        handleFinish(listOfUsernames, listOfGroupIds);
      }}
    >
      <Form.Item style={{ flex: "80%" }} name="members">
        <Select
          style={{ width: "100%" }}
          mode="multiple"
          placeholder="Select users and groups to add"
        >
          <OptGroup label="Users">{userOptions}</OptGroup>
          <OptGroup label="Groups">{groupOptions}</OptGroup>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Add Members</Button>
      </Form.Item>
    </Form>
  );
}

export default AddMembersForm2;
