import { Layout } from "antd";
import Text from "antd/lib/typography/Text";
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
    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
      <Text>Only members of a case are authorized to view it.</Text>
    </div>
    <MemberListP members={members} />
  </Content>
);

export default MembersP;
