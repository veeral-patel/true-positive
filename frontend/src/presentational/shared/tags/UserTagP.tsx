import { Tag } from "antd";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface UserTagProps {
  user: IUser | null;
}

const UserTagP: React.FC<UserTagProps> = ({ user }) => (
  <Tag>{user ? user.username : "N/A"}</Tag>
);

export default UserTagP;
