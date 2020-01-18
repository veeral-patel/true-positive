import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Typography } from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import SortableTaskList from "container/one_case/SortableTaskList";
import React from "react";
import ITaskGroup from "ts/interfaces/ITaskGroup";

const { Text } = Typography;

interface Props {
  taskGroup: ITaskGroup;
  createTask: (name: string) => void;
  renameTaskGroup: (taskGroupId: number, newName: string) => void;
  deleteTaskGroup: (taskGroupId: number) => void;
}

function TaskGroup2({
  taskGroup,
  createTask,
  renameTaskGroup,
  deleteTaskGroup
}: Props) {
  return (
    <div style={{ marginBottom: "3em" }}>
      <Text
        type="secondary"
        style={{ textTransform: "uppercase" }}
        editable={{
          onChange: newName => {
            renameTaskGroup(taskGroup.id, newName);
          }
        }}
      >
        {name}
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
                deleteTaskGroup(taskGroup.id);
              }
            });
          }}
        />
      </Tooltip>
      <div style={{ marginTop: "0.5em" }}>
        <CreateTaskInput
          handleEnter={event => {
            const nameOfNewTask = event.currentTarget.value;
            if (!nameOfNewTask) return; // do nothing if the name is empty
            createTask(nameOfNewTask);
          }}
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        <SortableTaskList existingTasks={taskGroup.tasks} />
      </div>
    </div>
  );
}

export default TaskGroup2;
