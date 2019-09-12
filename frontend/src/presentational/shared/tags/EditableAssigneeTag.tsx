import { Popover } from "antd";
import UserSelect from "container/shared/users/UserSelect";
import UserTagP from "presentational/shared/tags/UserTagP";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface EditableAssigneeTagProps {
  user: IUser | null;
}

const EditableAssigneeTag: React.FC<EditableAssigneeTagProps> = ({ user }) => (
  // need to add the {" "} below, or else the popover doesn't appear.
  <Popover title="Change Assignee" content={<UserSelect />}>
    <UserTagP user={user} />{" "}
  </Popover>
);

export default EditableAssigneeTag;
