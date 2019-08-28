import { Avatar, Icon, List } from "antd";
import RoleSelectP from "presentational/one_case/MembersP/RoleSelectP";
import React from "react";

interface MemberItemProps {
  username: string;
  email: string;
  role: "CAN_VIEW" | "CAN_EDIT";
}

const MemberItemP: React.FC<MemberItemProps> = ({ username, email, role }) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar icon="user" />}
      title={username}
      description={email}
    />
    <div>
      <div style={{ marginRight: "30px", display: "inline-block" }}>
        <RoleSelectP role={role} />
      </div>
      <Icon type="close" />
    </div>
  </List.Item>
);

export default MemberItemP;
