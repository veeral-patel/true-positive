import { Layout } from "antd";
import React from "react";
import ICaseMember from "ts/interfaces/ICaseMember";
import MemberListP from "./MemberListP";

const { Content } = Layout;

interface MembersProps {
  members: ICaseMember[];
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
