import { Layout } from "antd";
import React from "react";
import IMember from "ts/interfaces/IMember";
import MemberListP from "./MemberListP";

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
    <MemberListP members={members} />
  </Content>
);

export default MembersP;
