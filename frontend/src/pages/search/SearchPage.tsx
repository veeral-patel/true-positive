import { RouteComponentProps } from "@reach/router";
import { Badge, Menu } from "antd";
import React from "react";

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Menu theme="light" mode="vertical" defaultSelectedKeys={["cases"]}>
            <Menu.Item key="cases">
              <div>
                Cases
                <div style={{ float: "right" }}>
                  <Badge
                    count={25}
                    style={{
                      backgroundColor: "#40a9ff",
                      color: "white"
                    }}
                  />
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key="tasks">
              <div>
                Tasks
                <div style={{ float: "right" }}>
                  <Badge
                    count={20}
                    style={{
                      backgroundColor: "#40a9ff",
                      color: "white"
                    }}
                  />
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key="indicators">
              <div>
                Indicators
                <div style={{ float: "right" }}>
                  <Badge
                    count={5}
                    style={{
                      backgroundColor: "#40a9ff",
                      color: "white"
                    }}
                  />
                </div>
              </div>
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ flex: 4 }}></div>
      </div>
    );
  }
}

export default SearchPage;
