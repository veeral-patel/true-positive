import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

interface OneTaskProps extends RouteComponentProps {}

const OneTask: React.FC<OneTaskProps> = () => {
  return (
    <Content
      style={{
        backgroundColor: "#fff",
        padding: 24,
        marginLeft: 24,
        height: "100%"
      }}
    >
      Hi
    </Content>
  );
};

export default OneTask;
