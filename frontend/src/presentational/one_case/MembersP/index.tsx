import { Layout, List } from "antd";
import MemberItemP from "presentational/one_case/MembersP/MemberItemP";
import React from "react";
import IUser from "ts/interfaces/IUser";

const { Content } = Layout;

interface MembersProps {
  members: IUser[];
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
    <List<IUser>
      itemLayout="horizontal"
      dataSource={members}
      renderItem={member => (
        <MemberItemP username={member.username} email={member.email} />
      )}
    />
  </Content>
);

export default MembersP;
