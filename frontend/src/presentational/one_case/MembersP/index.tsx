import { Layout, List } from "antd";
import MemberItemP from "presentational/one_case/MembersP/MemberItemP";
import React from "react";
import IMember from "ts/interfaces/IMember";

const { Content } = Layout;

interface MembersProps {
  members: IMember[];
}

const MembersP: React.FC<MembersProps> = ({ members }) => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h2>Members ({members.length})</h2>
    <List<IMember>
      itemLayout="horizontal"
      dataSource={members}
      renderItem={member => (
        <MemberItemP
          username={member.user.username}
          email={member.user.email}
          role={member.role}
        />
      )}
    />
  </Content>
);

export default MembersP;
