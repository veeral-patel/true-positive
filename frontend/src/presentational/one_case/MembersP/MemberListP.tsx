import { List } from "antd";
import MemberItemP from "presentational/one_case/MembersP/MemberItemP";
import React from "react";
import IMember from "ts/interfaces/IMember";

interface MemberListProps {
  members: IMember[];
}

const MemberListP: React.FC<MemberListProps> = ({ members }) => (
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
);

export default MemberListP;
