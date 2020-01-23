import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Form,
  message,
  Modal,
  notification,
  Tooltip,
  Typography
} from "antd";
import TaskTemplateSelect from "container/admin/TaskTemplateSelect";
import SortableTTList from "container/one_case/SortableTTList";
import ADD_TASK_TEMPLATE_TO_TASK_GROUP from "mutations/addTaskTemplateToTaskGroup";
import GET_ONE_CASE_TEMPLATE from "queries/getOneCaseTemplate";
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
}

function TTGroup({
  taskGroup,
  caseTemplate,
  renameTaskGroup,
  deleteTaskGroup,
  handleTTClicked
}: Props) {
  const [addTaskTemplateToTaskGroup] = useMutation(
    ADD_TASK_TEMPLATE_TO_TASK_GROUP,
    {
      onCompleted() {
        message.success("Added task template");
      },
      onError(error) {
        notification.error({
          message: "Failed to add task template",
          description: error.message
        });
      },
      refetchQueries: [
        {
          query: GET_ONE_CASE_TEMPLATE,
          variables: {
            id: caseTemplate.id
          }
        }
      ]
    }
  );

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
          values.idsOfTaskTemplates.forEach((taskTemplateId: number) => {
            addTaskTemplateToTaskGroup({
              variables: {
                input: {
                  taskTemplateId,
                  caseTemplateId: caseTemplate.id,
                  taskGroupId: taskGroup.id
                }
              }
            });
          });
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
