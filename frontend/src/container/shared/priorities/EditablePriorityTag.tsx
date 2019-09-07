import { Popover } from "antd";
import ListAndFilterPriorities from "container/shared/priorities/ListAndFilterPriorities";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import React from "react";

interface EditablePriorityTagProps {
  priorityName: string;
}

class EditablePriorityTag extends React.Component<EditablePriorityTagProps> {
  render() {
    const { priorityName } = this.props;

    // need to add the {" "} below, or else the popover doesn't appear.
    return (
      <Popover title="Change Priority" content={<ListAndFilterPriorities />}>
        <PriorityTagP priorityName={priorityName} />{" "}
      </Popover>
    );
  }
}

export default EditablePriorityTag;
