import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import {
  Button,
  Checkbox,
  Divider,
  List,
  message,
  notification,
  Popconfirm,
  Tooltip
} from "antd";
import { ApolloError } from "apollo-boost";
import DELETE_A_TASK from "mutations/deleteTask";
import React from "react";
import { SortableElement } from "react-sortable-hoc";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface Props {
  task: ITask;
  markTaskAsDone: (taskId: number, done: boolean) => void;
}

const SortableItem = SortableElement(({ task, markTaskAsDone }: Props) => {
  const [deleteTask] = useMutation(DELETE_A_TASK, {
    onCompleted: function() {
      message.success("Deleted the task");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete the task",
        description: error.message
      });
    }
  });

  return (
    <List.Item style={{ cursor: "grab" }}>
      <List.Item.Meta
        title={
          <>
            <Checkbox
              style={{ marginRight: "1.0em" }}
              defaultChecked={task.done}
              onChange={event => markTaskAsDone(task.id, event.target.checked)}
            />
            <a onClick={() => navigate(getPathToATask(task.case.id, task.id))}>
              {truncateString(task.name, 75)}
            </a>
          </>
        }
        description={
          task.assignedTo && `Assigned to ${task.assignedTo.username}`
        }
      />
      <Tooltip title={`${task.commentCount} comment(s)`}>
        <MessageOutlined /> {task.commentCount}
      </Tooltip>
      <Divider type="vertical" />
      <Popconfirm
        title="Delete this task?"
        onConfirm={() =>
          deleteTask({
            variables: {
              input: {
                id: task.id
              }
            }
          })
        }
      >
        <Button icon={<DeleteOutlined />} style={{ border: "none" }} />
      </Popconfirm>
    </List.Item>
  );
});

export default SortableItem;
