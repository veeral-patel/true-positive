import {
  DeploymentUnitOutlined,
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { navigate } from "@reach/router";
import { Menu } from "antd";
import logo from "logo/tp_logo_lightblue.png";
import { inject, observer } from "mobx-react";
import React from "react";
import AuthStore from "stores/AuthStore";
import { paths } from "utils/constants";
import getUsernameOfCurrentUser from "utils/currentUser";
import { getApiEndpoint } from "utils/getApiEndpoint";
import GlobalAutocomplete from "./GlobalAutocomplete";

const { SubMenu } = Menu;

interface Props {
  authStore?: AuthStore;
}

function TopMenu({ authStore }: Props) {
  const usernameOfCurrentUser = getUsernameOfCurrentUser();

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
      <Menu.Item
        style={{ float: "left" }}
        onClick={() => navigate(paths.CASES_PATH)}
      >
        <img src={logo} style={{ verticalAlign: "middle", height: "20px" }} />
      </Menu.Item>
      <Menu.Item
        onClick={() => navigate(paths.CASES_PATH)}
        style={{ float: "left" }}
      >
        Cases
      </Menu.Item>
      <Menu.Item
        style={{ float: "left" }}
        onClick={() => navigate(paths.TASKS_PATH)}
      >
        Tasks
      </Menu.Item>
      <Menu.Item
        onClick={() => navigate(paths.MANAGE_PATH)}
        style={{ float: "left" }}
      >
        Manage
      </Menu.Item>
      <SubMenu
        title={
          <div>
            API
            {"  "}
            <DownOutlined />
          </div>
        }
        style={{ float: "left" }}
      >
        <Menu.Item onClick={() => navigate(paths.API_TOKENS_PATH)}>
          <KeyOutlined />
          Tokens
        </Menu.Item>
        <Menu.Item onClick={() => navigate(getApiEndpoint())}>
          <DeploymentUnitOutlined />
          Playground
        </Menu.Item>
      </SubMenu>
      <Menu.Item style={{ float: "left" }}>
        <GlobalAutocomplete />
      </Menu.Item>
      <SubMenu
        title={
          <div>
            {usernameOfCurrentUser}
            {"  "}
            <DownOutlined />
          </div>
        }
        style={{ float: "right" }}
      >
        <Menu.Item onClick={() => navigate(paths.PROFILE_PATH)}>
          <UserOutlined />
          Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => authStore!.logout()}>
          <LogoutOutlined />
          Log Out
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default inject("uiStore", "authStore")(observer(TopMenu));
