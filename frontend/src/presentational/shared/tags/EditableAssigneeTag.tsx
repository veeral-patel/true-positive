import { Popover } from "antd";
import AssignUserSelect from "container/shared/users/AssignUserSelect";
import UserTagP from "presentational/shared/tags/UserTagP";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface EditableAssigneeTagProps {
  user: IUser | null;
}

const EditableAssigneeTag: React.FC<EditableAssigneeTagProps> = ({ user }) => (
  // need to add the {" "} below, or else the popover doesn't appear.
  <Popover title="Change Assignee" content={<AssignUserSelect />}>
    <UserTagP user={user} />{" "}
  </Popover>
);

export default EditableAssigneeTag;
