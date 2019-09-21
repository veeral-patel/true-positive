import { navigate } from "@reach/router";
import { Icon, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";
import { paths } from "utils/constants";

interface TopMenuProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class TopMenu extends React.Component<TopMenuProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
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
              onClick={() => navigate(paths.ADMIN_PATH)}
              style={{ float: "left" }}
            >
              Admin
            </Menu.Item>
            <SubMenu
              title={
                <span>
                  New <Icon type="down" />
                </span>
              }
              style={{ float: "right" }}
            >
              <Menu.Item onClick={() => uiStore!.openCreateCaseModal()}>
                Case
              </Menu.Item>
            </SubMenu>
          </Menu>
        );
      }
    }
  )
);
