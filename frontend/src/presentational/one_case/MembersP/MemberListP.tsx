import { List } from "antd";
import MemberItemP from "presentational/one_case/MembersP/MemberItemP";
import React from "react";
import ICaseMember from "ts/interfaces/ICaseMember";

interface MemberListProps {
  members: ICaseMember[];
}

const MemberListP: React.FC<MemberListProps> = ({ members }) => (
  <List<ICaseMember>
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
