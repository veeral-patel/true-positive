import { navigate } from "@reach/router";
import { Icon, Menu } from "antd";
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

export default inject("uiStore", "authStore")(
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
            {/* <Menu.Item style={{ float: "left" }}>
              <GlobalAutocomplete />
            </Menu.Item> */}
            <SubMenu
              title={
                <div>
                  {usernameOfCurrentUser}
                  {"  "}
                  <Icon type="down" />
                </div>
              }
              style={{ float: "right" }}
            >
              <Menu.Item onClick={() => authStore!.logout()}>
                <Icon type="logout" />
                Log Out
              </Menu.Item>
            </SubMenu>
          </Menu>
        );
      }
    }
  )
);
