import { RouteComponentProps } from "@reach/router";
import { Menu } from "antd";
import React from "react";

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Menu theme="light" mode="vertical" defaultSelectedKeys={["cases"]}>
            <Menu.Item key="cases">Cases</Menu.Item>
            <Menu.Item key="tasks">Tasks</Menu.Item>
            <Menu.Item key="indicators">Indicators</Menu.Item>
          </Menu>
        </div>
        <div style={{ flex: 4 }}></div>
      </div>
    );
  }
}

export default SearchPage;
