import { Popover } from "antd";
import StatusSelect from "container/shared/statuses/StatusSelect";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";

interface EditableStatusTagProps {
  statusName: string;
  handleSelect: (statusId: number) => void;
}

const EditableStatusTag: React.FC<EditableStatusTagProps> = ({
  statusName,
  handleSelect
}) => (
  // need to add the {" "} below, or else the popover doesn't appear.
  <Popover
    title="Change Status"
    content={<StatusSelect handleSelect={handleSelect} />}
  >
    <StatusTagP statusName={statusName} />{" "}
  </Popover>
);

export default EditableStatusTag;
