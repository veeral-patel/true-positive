import { Icon, Layout, Menu, Typography } from "antd";
import { CollapseType } from "antd/lib/layout/Sider";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import {
  CASE_SIDER_INDICATORS,
  CASE_SIDER_INFO,
  CASE_SIDER_MEMBERS,
  CASE_SIDER_TASKS,
  CASE_SIDER_TREE
} from "utils/constants";
import getActiveSiderItem from "utils/getActiveSiderItem";

const { Sider } = Layout;
const { Text } = Typography;

interface ICaseSiderProps {
  uiStore?: UIStore;
  activeCaseStore?: ActiveCaseStore;
}

export default inject("uiStore", "activeCaseStore")(
  observer(
    class CaseSider extends React.Component<ICaseSiderProps> {
      render() {
        const { uiStore, activeCaseStore } = this.props;

        const isLoading = activeCaseStore!.activeCaseIsLoading;
        const activeCase = activeCaseStore!.activeCase;

        let caseName: string;
        let numberOfMembers: number | null;
        let numberOfTasks: number | null;
        let numberOfIndicators: number | null;

        if (isLoading) {
          caseName = "Loading";
          numberOfMembers = null;
          numberOfTasks = null;
          numberOfIndicators = null;
        } else {
          if (activeCase) {
            caseName = activeCase.name;
            numberOfMembers = activeCase.caseMembers.length;
            numberOfTasks = activeCase.tasks.length;
            numberOfIndicators = activeCase.indicators.length;
          } else {
            caseName = "Error";
            numberOfMembers = null;
            numberOfTasks = null;
            numberOfIndicators = null;
          }
        }

        const collapsed = uiStore!.caseSiderStatus === "COLLAPSED";

        return (
          <Sider
            width={200}
            style={{ background: "#fff" }}
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean, type: CollapseType) =>
              uiStore!.toggleCaseSider()
            }
            theme="light"
          >
            {!collapsed && (
              <div style={{ marginBottom: "10px" }}>
                <Text
                  type="secondary"
                  style={{ textTransform: "uppercase" }}
                  editable={{
                    onChange: (newText: string) =>
                      activeCaseStore!.renameActiveCase(newText)
                  }}
                >
                  {caseName}
                </Text>
              </div>
            )}
            <Menu
              mode="inline"
              selectedKeys={getActiveSiderItem(window.location.pathname)}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key={CASE_SIDER_INFO}>
                <Icon type="info-circle" />
                <span>Info</span>
              </Menu.Item>
              <Menu.Item key={CASE_SIDER_TASKS}>
                <Icon type="check-square" />
                <span>
                  Tasks{" "}
                  {numberOfTasks !== null && <span>({numberOfTasks})</span>}
                </span>
              </Menu.Item>
              <Menu.Item key={CASE_SIDER_INDICATORS}>
                <Icon type="security-scan" />
                <span>
                  Indicators{" "}
                  {numberOfIndicators !== null && (
                    <span>({numberOfIndicators})</span>
                  )}
                </span>
              </Menu.Item>
              <Menu.Item key={CASE_SIDER_TREE}>
                <Icon type="apartment" />
                <span>Tree</span>
              </Menu.Item>
              <Menu.Item key={CASE_SIDER_MEMBERS}>
                <Icon type="user" />
                <span>
                  Members{" "}
                  {numberOfMembers !== null && <span>({numberOfMembers})</span>}
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
        );
      }
    }
  )
);
