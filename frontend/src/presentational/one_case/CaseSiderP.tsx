import { Icon, Layout, Menu, Typography } from "antd";
import { CollapseType } from "antd/lib/layout/Sider";
import React from "react";

const { Sider } = Layout;
const { Text } = Typography;

interface ICaseSiderProps {
  collapsed: boolean;
  handleCollapse: (collapsed: boolean, type: CollapseType) => void;
  caseName: string;
  numberOfTasks: number | null;
  numberOfMembers: number | null;
  numberOfIndicators: number | null;
}

const CaseSiderP: React.FC<ICaseSiderProps> = ({
  collapsed,
  handleCollapse,
  caseName,
  numberOfTasks,
  numberOfMembers,
  numberOfIndicators
}) => (
  <Sider
    width={200}
    style={{ background: "#fff" }}
    collapsible
    collapsed={collapsed}
    onCollapse={handleCollapse}
    theme="light"
  >
    {!collapsed && (
      <div style={{ marginBottom: "10px" }}>
        <Text type="secondary" style={{ textTransform: "uppercase" }}>
          {caseName}
        </Text>
      </div>
    )}
    <Menu
      mode="inline"
      defaultSelectedKeys={["info"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key="info">
        <Icon type="info-circle" />
        <span>Info</span>
      </Menu.Item>
      <Menu.Item key="tasks">
        <Icon type="check-square" />
        <span>
          Tasks{" "}
          {numberOfTasks !== null ? <span>({numberOfTasks})</span> : <span />}
        </span>
      </Menu.Item>
      <Menu.Item key="indicators">
        <Icon type="security-scan" />
        <span>
          Indicators{" "}
          {numberOfIndicators !== null ? (
            <span>({numberOfIndicators})</span>
          ) : (
            <span />
          )}
        </span>
      </Menu.Item>
      <Menu.Item key="tree">
        <Icon type="apartment" />
        <span>Tree</span>
      </Menu.Item>
      <Menu.Item key="members">
        <Icon type="user" />
        <span>
          Members{" "}
          {numberOfMembers !== null ? (
            <span>({numberOfMembers})</span>
          ) : (
            <span />
          )}
        </span>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default CaseSiderP;
