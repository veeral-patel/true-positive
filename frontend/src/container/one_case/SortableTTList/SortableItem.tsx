import { DeleteOutlined } from "@ant-design/icons";
import { Button, List, Popconfirm } from "antd";
import React from "react";
import { SortableElement } from "react-sortable-hoc";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import ITaskGroup from "ts/interfaces/ITaskGroup";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import truncateString from "utils/truncateString";

interface Props {
  taskGroup: ITaskGroup;
  caseTemplate: ICaseTemplate;
  taskTemplate: ITaskTemplate;
  handleTTClicked: (id: number) => void;
  removeTaskTemplate: (taskTemplateId: number) => void;
}

const SortableItem = SortableElement(
  ({ taskTemplate, handleTTClicked, removeTaskTemplate }: Props) => {
    return (
      <List.Item
        key={taskTemplate.id}
        style={{ cursor: "grab" }}
        actions={[
          <Popconfirm
            title="Delete this task template?"
            onConfirm={() => removeTaskTemplate(taskTemplate.id)}
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        ]}
      >
        <List.Item.Meta
          title={
            <a
              onClick={() => handleTTClicked(taskTemplate.id)}
              style={{ cursor: "pointer" }}
            >
              {truncateString(taskTemplate.name, 75)}
            </a>
          }
          description={
            taskTemplate.assignedTo &&
            `Assigned to ${taskTemplate.assignedTo.username}`
          }
        />
      </List.Item>
    );
  }
);

export default SortableItem;
