import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UserStore from "stores/UserStore";

const { Option } = Select;

interface UserSelectProps {
  userStore?: UserStore;
}

export default inject("userStore")(
  observer(
    class UserSelect extends React.Component<UserSelectProps> {
      componentDidMount() {
        const { userStore } = this.props;
        userStore!.loadUsers();
      }

      render() {
        const { userStore } = this.props;

        if (userStore!.usersAreLoading) return <Spin />;

        const options = userStore!.users.map(user => (
          <Option key={user.username}>{user.username}</Option>
        ));

        return (
          <Select
            showSearch
            placeholder="Choose a user"
            style={{ minWidth: "200px" }}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
