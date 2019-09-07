import { Button, Dropdown, Icon, Menu } from "antd";
import React from "react";
import { DELETE_CASE } from "utils/constants";

class ActionsDropdown extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key={DELETE_CASE} style={{ color: "red" }}>
          Delete Case
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Button>
          Actions <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}

export default ActionsDropdown;
