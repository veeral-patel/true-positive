import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

interface OneTaskProps {}

const OneTaskP: React.FC<OneTaskProps> = () => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      marginLeft: 24,
      height: "100%"
    }}
  >
    Information about this task will go here.
  </Content>
);

export default OneTaskP;
