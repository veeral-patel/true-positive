import { Popover } from "antd";
import PrioritySelect from "container/shared/priorities/PrioritySelect";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import React from "react";

interface EditablePriorityTagProps {
  priorityName: string;
  handleSelect: (priorityName: string) => void;
}

const EditablePriorityTag: React.FC<EditablePriorityTagProps> = ({
  priorityName,
  handleSelect
}) => (
  // need to add the {" "} below, or else the popover doesn't appear.
  <Popover
    title="Change Priority"
    content={<PrioritySelect onChange={handleSelect} />}
  >
    <PriorityTagP priorityName={priorityName} />{" "}
  </Popover>
);

export default EditablePriorityTag;
