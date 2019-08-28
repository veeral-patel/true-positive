import { Avatar, Icon, List } from "antd";
import RoleSelectP from "presentational/one_case/MembersP/RoleSelectP";
import React from "react";

interface MemberItemProps {
  username: string;
}

const MemberItemP: React.FC<MemberItemProps> = ({ username }) => (
  <List.Item>
    <List.Item.Meta avatar={<Avatar icon="user" />} title={username} />
    <div>
      <div style={{ marginRight: "30px", display: "inline-block" }}>
        <RoleSelectP />
      </div>
      <Icon type="cross" />
    </div>
  </List.Item>
);

export default MemberItemP;
