import { Button, Dropdown, Icon, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React from "react";
import {
  ADD_COMMENT_TO_CASE,
  ADD_TAGS,
  ASSIGN_CASES_MODAL,
  CHANGE_PRIORITY,
  CHANGE_STATUS,
  MERGE_CASES_MODAL,
  REMOVE_TAGS
} from "utils/constants";

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
      <Menu.Item key="SELECTED_SUMMARY" disabled>
        {numberOfSelectedCases} case(s) selected
      </Menu.Item>
      <Menu.Item key={ADD_TAGS}>Add Tags</Menu.Item>
      <Menu.Item key={REMOVE_TAGS}>Remove Tags</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={CHANGE_STATUS}>Change Status</Menu.Item>
      <Menu.Item key={CHANGE_PRIORITY}>Change Priority</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={ADD_COMMENT_TO_CASE}>Add Comment</Menu.Item>
      <Menu.Item key={MERGE_CASES_MODAL}>Merge</Menu.Item>
      <Menu.Item key={ASSIGN_CASES_MODAL}>Assign</Menu.Item>
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
