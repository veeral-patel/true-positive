import { navigate } from "@reach/router";
import { Menu } from "antd";
import React from "react";

interface ITopMenuProps {
  numberOfCases: number;
}

const TopMenuP: React.FC<ITopMenuProps> = ({ numberOfCases }) => (
  <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
    <Menu.Item onClick={() => navigate("/cases")}>
      Cases ({numberOfCases})
    </Menu.Item>
  </Menu>
);

export default TopMenuP;
