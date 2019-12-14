import { RouteComponentProps } from "@reach/router";
import { Badge, Menu } from "antd";
import React from "react";

interface Props extends RouteComponentProps {}

function SearchPage(props: Props) {
  const badgeStyle = {
    backgroundColor: "#262626",
    color: "#e8e8e8"
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Menu theme="light" mode="vertical" defaultSelectedKeys={["cases"]}>
          <Menu.Item key="cases">
            <div>
              Cases
              <div style={{ float: "right" }}>
                <Badge count={25} style={badgeStyle} />
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="tasks">
            <div>
              Tasks
              <div style={{ float: "right" }}>
                <Badge count={20} style={badgeStyle} />
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="indicators">
            <div>
              Indicators
              <div style={{ float: "right" }}>
                <Badge count={5} style={badgeStyle} />
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="comments">
            <div>
              Comments
              <div style={{ float: "right" }}>
                <Badge count={0} style={badgeStyle} />
              </div>
            </div>
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ flex: 4 }}></div>
    </div>
  );
}

export default SearchPage;
