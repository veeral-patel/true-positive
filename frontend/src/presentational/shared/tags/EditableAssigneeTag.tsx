import { Popover, Tag } from "antd";
import UserSelect from "container/shared/users/UserSelect";
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
    content={<UserSelect handleSelect={handleSelect} forAssigning={true} />}
  >
    <Tag>{user ? user.username : "N/A"}</Tag>{" "}
  </Popover>
);

export default EditableAssigneeTag;
