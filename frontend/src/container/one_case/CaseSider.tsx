import {
  CheckSquareOutlined,
  InfoCircleOutlined,
  SecurityScanOutlined,
  UserOutlined
} from "@ant-design/icons";
import { navigate } from "@reach/router";
import { Layout, Menu, Typography } from "antd";
import { inject, observer } from "mobx-react";
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
        numberOfDoneTasks = activeCase.completedTaskCount;
        numberOfTasks = activeCase.totalTaskCount;
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

    return (
      <Sider
        collapsible
        collapsed={collapsed}
        theme={uiStore!.theme === "LIGHT" ? "light" : "dark"}
        breakpoint="lg"
        style={{ borderRadius: "8px" }}
        onCollapse={() => uiStore!.toggleCaseSider()}
      >
        {!collapsed && (
          <div
            style={{
              marginBottom: "0.5em",
              paddingTop: uiStore!.theme === "LIGHT" ? "0em" : "1.5em",
              paddingLeft: "1.5em"
            }}
          >
            <Text
              type="secondary"
              style={{ textTransform: "uppercase" }}
              editable={{
                onChange: (newName: string) => {
                  activeCaseStore!.renameActiveCase(newName);
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
            <InfoCircleOutlined />
            <span>Info</span>
          </Menu.Item>
          <Menu.Item
            key={CASE_SIDER_TASKS}
            onClick={() =>
              activeCase && navigate(getPathToCaseTasks(activeCase.id))
            }
          >
            <CheckSquareOutlined />
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
            <SecurityScanOutlined />
            <span>
              Indicators{" "}
              {numberOfIndicators !== null && (
                <span>({numberOfIndicators})</span>
              )}
            </span>
          </Menu.Item>
          {/* <Menu.Item
            key={CASE_SIDER_FORMS}
            onClick={() =>
              activeCase && navigate(getPathToCaseForms(activeCase.id))
            }
          >
            <ReconciliationFilled />
            <span>Forms (4)</span>
          </Menu.Item> */}
          <Menu.Item
            key={CASE_SIDER_MEMBERS}
            onClick={() =>
              activeCase && navigate(getPathToACaseMembers(activeCase.id))
            }
          >
            <UserOutlined />
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
