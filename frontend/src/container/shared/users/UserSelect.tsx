import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UserStore from "stores/UserStore";

const { Option } = Select;

interface UserSelectProps {
  userStore?: UserStore;
  selectMultiple?: boolean;
  placeholder: string;
}

export default inject("userStore")(
  observer(
    class UserSelect extends React.Component<UserSelectProps> {
      componentDidMount() {
        const { userStore } = this.props;
        userStore!.loadUsers();
      }

      render() {
        const { userStore, selectMultiple, placeholder } = this.props;

        if (userStore!.usersAreLoading) return <Spin />;

        const options = userStore!.users.map(user => (
          <Option key={user.username}>{user.username}</Option>
        ));

        return (
          <Select
            showSearch
            mode={selectMultiple === true ? "multiple" : "default"}
            placeholder={placeholder}
            style={{ minWidth: "200px", width: "85%" }}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
