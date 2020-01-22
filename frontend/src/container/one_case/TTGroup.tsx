import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Typography } from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import SortableTTList from "container/one_case/SortableTTList";
import React from "react";
import ITaskGroup from "ts/interfaces/ITaskGroup";

const { Text } = Typography;

interface Props {
  taskGroup: ITaskGroup;
  createTT: (name: string) => void;
  renameTaskGroup: (newName: string) => void;
  deleteTaskGroup: () => void;
  handleTTClicked: (id: number) => void;
}

function TTGroup({
  taskGroup,
  createTT,
  renameTaskGroup,
  deleteTaskGroup,
  handleTTClicked
}: Props) {
  return (
    <div style={{ marginBottom: "3em" }}>
      <Text
        type="secondary"
        style={{ textTransform: "uppercase" }}
        editable={{
          onChange: newName => renameTaskGroup(newName)
        }}
      >
        {taskGroup.name}
      </Text>
      <Tooltip title="Delete">
        <Button
          icon={<DeleteOutlined />}
          type="link"
          onClick={() => {
            Modal.confirm({
              title: "Delete this task group?",
              content:
                "This will also delete all the tasks in this task group.",
              onOk: () => {
                deleteTaskGroup();
              }
            });
          }}
        />
      </Tooltip>
      <div style={{ marginTop: "0.5em" }}>
        <CreateTaskInput
          placeholder="Create a task template"
          handleEnter={event => {
            const nameOfNewTask = event.currentTarget.value;
            if (!nameOfNewTask) return; // do nothing if the name is empty
            createTT(nameOfNewTask);
          }}
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        <SortableTTList
          existingTTs={taskGroup.taskTemplates}
          handleTTClicked={handleTTClicked}
        />
      </div>
    </div>
  );
}

export default TTGroup;
