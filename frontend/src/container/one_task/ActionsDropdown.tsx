import { Button, Dropdown, Icon, Menu } from "antd";
import React from "react";
import { DELETE_TASK } from "utils/constants";

const ActionsDropdown: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key={DELETE_TASK} style={{ color: "red" }}>
        Delete Task
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
};

export default ActionsDropdown;
