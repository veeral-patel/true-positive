import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Tooltip, Typography } from "antd";
import SortableTTList from "container/one_case/SortableTTList";
import React from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import ITaskGroup from "ts/interfaces/ITaskGroup";

const { Text } = Typography;

interface Props {
  taskGroup: ITaskGroup;
  caseTemplate: ICaseTemplate;
  createTT: (name: string) => void;
  renameTaskGroup: (newName: string) => void;
  deleteTaskGroup: () => void;
  handleTTClicked: (id: number) => void;
}

function TTGroup({
  taskGroup,
  caseTemplate,
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
        <Select
          placeholder="Choose task templates to add"
          mode="multiple"
          options={[]}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        <SortableTTList
          existingTTs={taskGroup.taskTemplates}
          handleTTClicked={handleTTClicked}
          taskGroup={taskGroup}
          caseTemplate={caseTemplate}
        />
      </div>
    </div>
  );
}

export default TTGroup;
