import { Layout, List } from "antd";
import MemberItemP from "presentational/one_case/MembersP/MemberItemP";
import React from "react";

const { Content } = Layout;

interface MembersProps {}

const data = [
  {
    username: "rob",
    email: "rob@example.org"
  },
  {
    username: "john",
    email: "john@example.org"
  }
];

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
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={member => <MemberItemP username={member.username} />}
    />
  </Content>
);

export default Members;
