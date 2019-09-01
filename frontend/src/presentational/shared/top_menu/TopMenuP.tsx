import { navigate } from "@reach/router";
import { Icon, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { paths } from "utils/constants";

interface TopMenuProps {
  openCreateCaseModal: () => void;
}

const TopMenuP: React.FC<TopMenuProps> = ({ openCreateCaseModal }) => (
  <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
    <Menu.Item onClick={() => navigate(paths.CASES_PATH)}>Cases</Menu.Item>
    <Menu.Item onClick={() => navigate(paths.ADMIN_PATH)}>Admin</Menu.Item>
    <SubMenu
      title={
        <span>
          New <Icon type="down" />
        </span>
      }
    >
      <Menu.Item onClick={() => openCreateCaseModal()}>Case</Menu.Item>
    </SubMenu>
  </Menu>
);

export default TopMenuP;
