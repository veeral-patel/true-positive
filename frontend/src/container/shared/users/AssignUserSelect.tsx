import { Select } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UserStore from "stores/UserStore";
import { NO_ASSIGNED_USER } from "utils/constants";

const { Option } = Select;

interface Props {
  handleSelect: (userId: any) => void;
  userStore?: UserStore;
}

export default inject("userStore")(
  observer(
    class AssignUserSelect extends React.Component<Props> {
      componentDidMount() {
        const { userStore } = this.props;
        userStore!.loadUsers();
      }

      render() {
        const { userStore, handleSelect } = this.props;

        // generate a list of options
        const options = userStore!.users
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

        // render our component
        return (
          <Select
            showSearch
            placeholder="Choose a user"
            style={{ minWidth: "200px" }}
            onSelect={userId => handleSelect(userId)}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
