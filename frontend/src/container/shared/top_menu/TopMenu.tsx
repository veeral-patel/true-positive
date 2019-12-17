import {
  DeploymentUnitOutlined,
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { navigate } from "@reach/router";
import { Menu } from "antd";
import GlobalAutocomplete from "container/shared/top_menu/GlobalAutocomplete";
import logo from "logo/tp_logo_lightblue.png";
import { inject, observer } from "mobx-react";
import React from "react";
import AuthStore from "stores/AuthStore";
import { paths } from "utils/constants";
import getUsernameOfCurrentUser from "utils/currentUser";

const { SubMenu } = Menu;

interface TopMenuProps {
  authStore?: AuthStore;
}

export default inject(
  "uiStore",
  "authStore"
)(
  observer(
    class TopMenu extends React.Component<TopMenuProps> {
      render() {
        const { authStore } = this.props;
        const usernameOfCurrentUser = getUsernameOfCurrentUser();

        return (
          <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
            <Menu.Item
              style={{ float: "left" }}
              onClick={() => navigate(paths.CASES_PATH)}
            >
              <img
                src={logo}
                style={{ verticalAlign: "middle", height: "20px" }}
              />
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
              <Menu.Item
                onClick={() =>
                  process.env.REACT_APP_API_ENDPOINT &&
                  navigate(process.env.REACT_APP_API_ENDPOINT)
                }
              >
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
              <Menu.Item>
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
    }
  )
);
