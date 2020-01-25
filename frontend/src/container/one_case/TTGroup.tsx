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
  renameTaskGroup: (newName: string) => void;
  deleteTaskGroup: () => void;
  handleTTClicked: (id: number) => void;
  addTaskTemplate: (taskTemplateId: number) => void;
}

function TTGroup({
  taskGroup,
  caseTemplate,
  renameTaskGroup,
  deleteTaskGroup,
  handleTTClicked,
  addTaskTemplate
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
      <Form
        style={{ display: "flex" }}
        onFinish={values => {
          if (!values.idsOfTaskTemplates) return;
          values.idsOfTaskTemplates.forEach((taskTemplateId: number) =>
            addTaskTemplate(taskTemplateId)
          );
        }}
      >
        <Form.Item style={{ width: "95%" }} name="idsOfTaskTemplates">
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
