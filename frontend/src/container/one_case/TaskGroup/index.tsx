import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  message,
  Modal,
  notification,
  Tooltip,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import SortableTaskList from "container/one_case/SortableTaskList";
import { inject, observer } from "mobx-react";
import CREATE_A_TASK from "mutations/createTask";
import DELETE_A_TASK_GROUP from "mutations/deleteTaskGroup";
import UPDATE_TASK_GROUP from "mutations/updateTaskGroup";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";

const { Text } = Typography;

interface Props {
  name: string;
  tasks: ITask[];
  taskGroupId: number;
  caseId: number;
  activeCaseStore?: ActiveCaseStore;
  // whether this task group is to be displayed in a case template (not a case)
  forCaseTemplate?: boolean;
}

function TaskGroup({
  name,
  tasks,
  taskGroupId,
  activeCaseStore,
  caseId,
  forCaseTemplate = false
}: Props) {
  const [createTask] = useMutation(CREATE_A_TASK, {
    onCompleted: function() {
      message.success("Created the task");
      if (!forCaseTemplate) activeCaseStore!.loadActiveCase();
    },
    onError: function(error) {
      notification.error({
        message: "Could not create task",
        description: error.message
      });
    }
  });

  const [updateTaskGroup] = useMutation(UPDATE_TASK_GROUP, {
    onCompleted: function() {
      message.success("Updated the task group");
      if (!forCaseTemplate) activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "An error occurred while updating the task group",
        description: error
      });
    }
  });

  const [deleteTaskGroup] = useMutation(DELETE_A_TASK_GROUP, {
    onCompleted: function() {
      message.success("Deleted task group");
      if (!forCaseTemplate) activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete this task group",
        description: error.message
      });
    }
  });

  return (
    <div style={{ marginBottom: "3em" }}>
      <div>
        <Text
          type="secondary"
          style={{ textTransform: "uppercase" }}
          editable={{
            onChange: newName => {
              updateTaskGroup({
                variables: {
                  input: {
                    id: taskGroupId,
                    name: newName
                  }
                }
              });
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
                  deleteTaskGroup({
                    variables: {
                      input: {
                        id: taskGroupId
                      }
                    }
                  });
                }
              });
            }}
          />
        </Tooltip>
      </div>
      <div style={{ marginTop: "0.5em" }}>
        <CreateTaskInput
          handleEnter={event => {
            const nameOfNewTask = event.currentTarget.value;
            if (!nameOfNewTask) return; // do nothing if the name is empty
            createTask({
              variables: {
                input: {
                  name: nameOfNewTask,
                  taskGroupId,
                  caseId
                }
              }
            });
          }}
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        <SortableTaskList existingTasks={tasks} />
      </div>
    </div>
  );
}

export default inject("activeCaseStore")(observer(TaskGroup));
