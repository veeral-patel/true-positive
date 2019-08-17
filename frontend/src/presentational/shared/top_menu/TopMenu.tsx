import React from "react";
import { Menu } from "antd";
import { navigate } from "@reach/router";

const TopMenu: React.FC = () => (
  <Menu theme="dark" mode="horizontal">
    <Menu.Item onClick={() => navigate("/cases")}>Cases</Menu.Item>
  </Menu>
);

export default TopMenu;
