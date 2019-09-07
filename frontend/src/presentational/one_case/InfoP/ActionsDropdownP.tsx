import { Button, Dropdown, Icon, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React from "react";
import { DELETE_CASE, MERGE_CASE } from "utils/constants";

interface ActionsDropdownProps {
  handleMenuClick: (click: ClickParam) => void;
}

const ActionsDropdownP: React.FC<ActionsDropdownProps> = ({
  handleMenuClick
}) => {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={MERGE_CASE}>Merge</Menu.Item>
      <Menu.Divider />
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
};

export default ActionsDropdownP;
