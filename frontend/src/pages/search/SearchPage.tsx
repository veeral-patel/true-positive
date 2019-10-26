import { RouteComponentProps } from "@reach/router";
import { Menu } from "antd";
import React from "react";

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Menu theme="light" mode="vertical">
            <Menu.Item>Cases</Menu.Item>
            <Menu.Item>Tasks</Menu.Item>
            <Menu.Item>Indicators</Menu.Item>
          </Menu>
        </div>
        <div style={{ flex: 4 }}></div>
      </div>
    );
  }
}

export default SearchPage;
