import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

const OneTaskP: React.FC<OneTaskProps> = () => (
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

export default OneTaskP;
