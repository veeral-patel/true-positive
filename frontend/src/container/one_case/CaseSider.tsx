import { navigate } from "@reach/router";
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
import {
  getPathToACase,
  getPathToACaseMembers,
  getPathToACaseTree,
  getPathToCaseIndicators,
  getPathToCaseTasks
} from "utils/pathHelpers";

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
              selectable={false}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item
                key={CASE_SIDER_INFO}
                onClick={() =>
                  // should be getPathToACaseInfo, but the browser scrolls down, beyond the breadcrumb,
                  // when I do that
                  activeCase && navigate(getPathToACase(activeCase.id))
                }
              >
                <Icon type="info-circle" />
                <span>Info</span>
              </Menu.Item>
              <Menu.Item
                key={CASE_SIDER_TASKS}
                onClick={() =>
                  activeCase && navigate(getPathToCaseTasks(activeCase.id))
                }
              >
                <Icon type="check-square" />
                <span>
                  Tasks{" "}
                  {numberOfTasks !== null && <span>({numberOfTasks})</span>}
                </span>
              </Menu.Item>
              <Menu.Item
                key={CASE_SIDER_INDICATORS}
                onClick={() =>
                  activeCase && navigate(getPathToCaseIndicators(activeCase.id))
                }
              >
                <Icon type="security-scan" />
                <span>
                  Indicators{" "}
                  {numberOfIndicators !== null && (
                    <span>({numberOfIndicators})</span>
                  )}
                </span>
              </Menu.Item>
              <Menu.Item
                key={CASE_SIDER_TREE}
                onClick={() =>
                  activeCase && navigate(getPathToACaseTree(activeCase.id))
                }
              >
                <Icon type="apartment" />
                <span>Tree</span>
              </Menu.Item>
              <Menu.Item
                key={CASE_SIDER_MEMBERS}
                onClick={() =>
                  activeCase && navigate(getPathToACaseMembers(activeCase.id))
                }
              >
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
