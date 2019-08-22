import { navigate } from "@reach/router";
import { Menu } from "antd";
import React from "react";
import { paths } from "utils/constants";

interface ITopMenuProps {
  numberOfCases?: number;
}

const TopMenuP: React.FC<ITopMenuProps> = ({ numberOfCases }) => (
  <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
    <Menu.Item onClick={() => navigate(paths.ALL_CASES_PATH)}>Cases</Menu.Item>
  </Menu>
);

export default TopMenuP;
