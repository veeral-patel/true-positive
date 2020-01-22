import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Button, List, message, notification, Popconfirm } from "antd";
import REMOVE_TASK_TEMPLATE_FROM_TASK_GROUP from "mutations/removeTaskTemplateFromTaskGroup";
import GET_ONE_CASE_TEMPLATE from "queries/getOneCaseTemplate";
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
}

const SortableItem = SortableElement(
  ({ taskTemplate, handleTTClicked, caseTemplate, taskGroup }: Props) => {
    const [removeTaskTemplateFromTaskGroup] = useMutation(
      REMOVE_TASK_TEMPLATE_FROM_TASK_GROUP,
      {
        onCompleted: function() {
          message.success("Removed task template");
        },
        onError: function(error) {
          notification.error({
            message: "Failed to remove task template",
            description: error.message
          });
        },
        refetchQueries: [
          {
            query: GET_ONE_CASE_TEMPLATE,
            variables: { id: caseTemplate.id }
          }
        ]
      }
    );

    return (
      <div style={{ borderBottom: "1px solid #1f1f1f" }}>
        <List.Item
          key={taskTemplate.id}
          style={{ cursor: "grab", borderBottom: "none" }}
          actions={[
            <Popconfirm
              title="Delete this task template?"
              onConfirm={() =>
                removeTaskTemplateFromTaskGroup({
                  variables: {
                    input: {
                      taskTemplateId: taskTemplate.id,
                      caseTemplateId: caseTemplate.id,
                      taskGroupId: taskGroup.id
                    }
                  }
                })
              }
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
      </div>
    );
  }
);

export default SortableItem;
