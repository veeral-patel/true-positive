import { navigate } from "@reach/router";
import { Menu } from "antd";
import GlobalAutocomplete from "container/shared/top_menu/GlobalAutocomplete";
import logo from "logo/tp_logo_lightblue.svg";
import { inject, observer } from "mobx-react";
import React from "react";
import AuthStore from "stores/AuthStore";
import { paths } from "utils/constants";

interface TopMenuProps {
  authStore?: AuthStore;
}

export default inject("uiStore", "authStore")(
  observer(
    class TopMenu extends React.Component<TopMenuProps> {
      render() {
        const { authStore } = this.props;
        return (
          <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
            <Menu.Item
              style={{ float: "left" }}
              onClick={() => navigate(paths.CASES_PATH)}
            >
              <img src={logo} style={{ verticalAlign: "middle" }} />
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
            <Menu.Item style={{ float: "left" }}>
              <GlobalAutocomplete />
            </Menu.Item>
            <Menu.Item
              style={{ float: "right" }}
              onClick={() => authStore!.logout()}
            >
              Log Out
            </Menu.Item>
          </Menu>
        );
      }
    }
  )
);
