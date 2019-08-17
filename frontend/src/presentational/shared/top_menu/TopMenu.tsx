import { navigate } from "@reach/router";
import { Menu } from "antd";
import React from "react";

const TopMenu: React.FC = () => (
  <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
    <Menu.Item onClick={() => navigate("/cases")}>Cases</Menu.Item>
  </Menu>
);

export default TopMenu;
