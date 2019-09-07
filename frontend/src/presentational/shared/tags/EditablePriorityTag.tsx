import { Popover } from "antd";
import ListAndFilterPriorities from "container/shared/priorities/ListAndFilterPriorities";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import React from "react";

interface EditablePriorityTagProps {
  priorityName: string;
}

const EditablePriorityTag: React.FC<EditablePriorityTagProps> = ({
  priorityName
}) => (
  // need to add the {" "} below, or else the popover doesn't appear.
  <Popover title="Change Priority" content={<ListAndFilterPriorities />}>
    <PriorityTagP priorityName={priorityName} />{" "}
  </Popover>
);

export default EditablePriorityTag;
