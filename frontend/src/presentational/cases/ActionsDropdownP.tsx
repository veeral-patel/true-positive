import { Button, Dropdown, Icon, Menu } from "antd";
import React from "react";

interface IActionsDropdownProps {
  numberOfSelectedCases: number;
}

const ActionsDropdownP: React.FC<IActionsDropdownProps> = ({
  numberOfSelectedCases
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="selected_summary" disabled>
        {numberOfSelectedCases} case(s) selected
      </Menu.Item>
      <Menu.Item key="add_tags">Add Tags</Menu.Item>
      <Menu.Item key="remove_tags">Remove Tags</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="change_status">Change Status</Menu.Item>
      <Menu.Item key="change_priority">Change Priority</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="add_comment">Add Comment</Menu.Item>
      <Menu.Item key="merge">Merge</Menu.Item>
      <Menu.Item key="assign">Assign</Menu.Item>
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
