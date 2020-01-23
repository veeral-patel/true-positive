import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Tooltip, Typography } from "antd";
import TaskTemplateSelect from "container/admin/TaskTemplateSelect";
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
      <Form style={{ display: "flex" }}>
        <Form.Item style={{ width: "95%" }}>
          <TaskTemplateSelect placeholder="Choose task templates to add" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
      <SortableTTList
        existingTTs={taskGroup.taskTemplates}
        handleTTClicked={handleTTClicked}
        taskGroup={taskGroup}
        caseTemplate={caseTemplate}
      />
    </div>
  );
}

export default TTGroup;
