import { Popover, Tag } from "antd";
import AssignUserSelect from "container/shared/users/AssignUserSelect";
import React from "react";
import IUser from "ts/interfaces/IUser";

interface EditableAssigneeTagProps {
  user: IUser | null;
  handleSelect: (username: string) => void;
}

const EditableAssigneeTag: React.FC<EditableAssigneeTagProps> = ({
  user,
  handleSelect
}) => (
  // need to add the {" "} below, or else the popover doesn't appear.
  <Popover
    title="Change Assignee"
    content={<AssignUserSelect handleSelect={handleSelect} />}
  >
    <Tag>{user ? user.username : "N/A"}</Tag>{" "}
  </Popover>
);

export default EditableAssigneeTag;
