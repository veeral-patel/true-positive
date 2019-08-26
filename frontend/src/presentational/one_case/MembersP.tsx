import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

interface MembersProps {}

const Members: React.FC<MembersProps> = () => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h2>Members</h2>
  </Content>
);

export default Members;
