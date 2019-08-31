import { navigate } from "@reach/router";
import { Menu } from "antd";
import React from "react";
import { paths } from "utils/constants";

const TopMenuP: React.FC = () => (
  <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
    <Menu.Item onClick={() => navigate(paths.CASES_PATH)}>Cases</Menu.Item>
    <Menu.Item onClick={() => navigate(paths.ADMIN_PATH)}>Admin</Menu.Item>
  </Menu>
);

export default TopMenuP;
