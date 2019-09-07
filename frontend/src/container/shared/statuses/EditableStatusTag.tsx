import { Popover } from "antd";
import ListAndFilterStatuses from "container/shared/statuses/ListAndFilterStatuses";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";

interface EditableStatusTagProps {
  statusName: string;
}

class EditableStatusTag extends React.Component<EditableStatusTagProps> {
  render() {
    const { statusName } = this.props;

    // need to add the {" "} below, or else the popover doesn't appear.
    return (
      <Popover title="Change Status" content={<ListAndFilterStatuses />}>
        <StatusTagP statusName={statusName} />{" "}
      </Popover>
    );
  }
}

export default EditableStatusTag;
