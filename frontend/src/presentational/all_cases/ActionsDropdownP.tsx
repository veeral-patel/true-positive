import { Button, Dropdown, Icon, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React from "react";
import { ADD_TAGS, CHANGE_STATUS, REMOVE_TAGS } from "utils/constants";

interface IActionsDropdownProps {
  numberOfSelectedCases: number;
  handleMenuClick: (click: ClickParam) => void;
}

const ActionsDropdownP: React.FC<IActionsDropdownProps> = ({
  numberOfSelectedCases,
  handleMenuClick
}) => {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="selected_summary" disabled>
        {numberOfSelectedCases} case(s) selected
      </Menu.Item>
      <Menu.Item key={ADD_TAGS}>Add Tags</Menu.Item>
      <Menu.Item key={REMOVE_TAGS}>Remove Tags</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={CHANGE_STATUS}>Change Status</Menu.Item>
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
