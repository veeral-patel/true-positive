import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import { Icon, Layout, Menu, message, Typography } from "antd";
import { CollapseType } from "antd/lib/layout/Sider";
import { inject, observer } from "mobx-react";
import RENAME_A_CASE from "mutations/renameCase";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import {
  CASE_SIDER_INDICATORS,
  CASE_SIDER_INFO,
  CASE_SIDER_MEMBERS,
  CASE_SIDER_TASKS
} from "utils/constants";
import {
  getPathToACase,
  getPathToACaseMembers,
  getPathToCaseIndicators,
  getPathToCaseTasks
} from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Sider } = Layout;
const { Text } = Typography;

interface CaseSiderProps {
  uiStore?: UIStore;
  activeCaseStore?: ActiveCaseStore;
}

export default inject(
  "uiStore",
  "activeCaseStore"
)(
  observer((props: CaseSiderProps) => {
    const { uiStore, activeCaseStore } = props;

    const isLoading = activeCaseStore!.activeCaseIsLoading;
    const activeCase = activeCaseStore!.activeCase;

    let caseName: string;
    let numberOfMembers: number | null;
    let numberOfDoneTasks: number | null;
    let numberOfTasks: number | null;
    let numberOfIndicators: number | null;

    if (isLoading) {
      caseName = "Loading";
      numberOfMembers = null;
      numberOfDoneTasks = null;
      numberOfTasks = null;
      numberOfIndicators = null;
    } else {
      if (activeCase) {
        caseName = activeCase.name;
        numberOfMembers = activeCase.caseMembers.length;
        numberOfDoneTasks = activeCase.tasks.filter(task => task.done).length;
        numberOfTasks = activeCase.tasks.length;
        numberOfIndicators = activeCase.indicators.length;
      } else {
        caseName = "Error";
        numberOfMembers = null;
        numberOfDoneTasks = null;
        numberOfTasks = null;
        numberOfIndicators = null;
      }
    }

    const collapsed = uiStore!.caseSiderStatus === "COLLAPSED";

    const [renameCase] = useMutation(RENAME_A_CASE, {
      onCompleted: function() {
        message.success("Renamed the case");
      }
    });

    return (
      <Sider
        style={{ background: "#fff" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed: boolean, type: CollapseType) =>
          uiStore!.toggleCaseSider()
        }
        theme="light"
        breakpoint="lg"
      >
        {!collapsed && (
          <div style={{ marginBottom: "10px" }}>
            <Text
              type="secondary"
              style={{ textTransform: "uppercase" }}
              editable={{
                onChange: (newName: string) => {
                  if (!activeCaseStore!.activeCase) return;
                  renameCase({
                    variables: {
                      input: {
                        id: activeCaseStore!.activeCase.id,
                        name: newName
                      }
                    }
                  });
                }
              }}
            >
              {truncateString(caseName, 90)}
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
              {numberOfTasks !== null &&
                numberOfDoneTasks !== null &&
                (numberOfTasks === 0 ? (
                  <span>({numberOfTasks})</span>
                ) : (
                  <span>
                    ({numberOfDoneTasks}/{numberOfTasks})
                  </span>
                ))}
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
  })
);
