import { Breadcrumb, Icon, Layout, Menu } from "antd";
import React from "react";

const { Content, Sider } = Layout;

const CaseSiderP = () => (
  <Layout>
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["info"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="info">
          <span>
            <Icon type="info-circle" />
            Info
          </span>
        </Menu.Item>
        <Menu.Item key="members">
          <span>
            <Icon type="user" />
            Members
          </span>
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
