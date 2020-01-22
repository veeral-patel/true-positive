import { List } from "antd";
import React from "react";
import { SortableElement } from "react-sortable-hoc";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import truncateString from "utils/truncateString";

interface Props {
  taskTemplate: ITaskTemplate;
}

const SortableItem = SortableElement(({ taskTemplate }: Props) => (
  <div style={{ borderBottom: "1px solid #1f1f1f" }}>
    <List.Item
      key={taskTemplate.id}
      style={{ cursor: "grab", borderBottom: "none" }}
    >
      <List.Item.Meta
        title={truncateString(taskTemplate.name, 75)}
        description={
          taskTemplate.assignedTo &&
          `Assigned to ${taskTemplate.assignedTo.username}`
        }
      />
    </List.Item>
  </div>
));

export default SortableItem;
