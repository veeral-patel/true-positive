import { Breadcrumb, Icon, Layout, Menu } from "antd";
import { CollapseType } from "antd/lib/layout/Sider";
import React from "react";

const { Content, Sider } = Layout;

interface ICaseSiderProps {
  collapsed: boolean;
  handleCollapse: (collapsed: boolean, type: CollapseType) => void;
}

const CaseSiderP: React.FC<ICaseSiderProps> = ({
  collapsed,
  handleCollapse
}) => (
  <Layout>
    <Sider
      width={200}
      style={{ background: "#fff" }}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      theme="light"
    >
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
          <span>Tasks</span>
        </Menu.Item>
        <Menu.Item key="indicators">
          <Icon type="security-scan" />
          <span>Indicators</span>
        </Menu.Item>
        <Menu.Item key="tree">
          <Icon type="apartment" />
          <span>Tree</span>
        </Menu.Item>
        <Menu.Item key="members">
          <Icon type="user" />
          <span>Members</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        Content
      </Content>
    </Layout>
  </Layout>
);

export default CaseSiderP;
