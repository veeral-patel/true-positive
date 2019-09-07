import { Button, Dropdown, Icon, Menu } from "antd";
import React from "react";
import { DELETE_CASE } from "utils/constants";

const menu = (
  <Menu>
    <Menu.Item key={DELETE_CASE} style={{ color: "red" }}>
      Delete Case
    </Menu.Item>
  </Menu>
);

const ActionsDropdownP: React.FC = () => (
  <Dropdown overlay={menu}>
    <Button>
      Actions <Icon type="down" />
    </Button>
  </Dropdown>
);

export default ActionsDropdownP;
