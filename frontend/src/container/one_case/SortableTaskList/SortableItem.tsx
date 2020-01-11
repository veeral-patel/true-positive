import {
  DeleteOutlined,
  MessageOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import {
  Button,
  Checkbox,
  List,
  message,
  notification,
  Popconfirm,
  Popover,
  Tooltip
} from "antd";
import { ApolloError } from "apollo-boost";
import DescriptionEditor from "container/shared/markdown/DescriptionEditor";
import UserSelect from "container/shared/users/UserSelect";
import { inject, observer } from "mobx-react";
import DELETE_A_TASK from "mutations/deleteTask";
import UPDATE_TASK from "mutations/updateTask";
import React, { useState } from "react";
import { SortableElement } from "react-sortable-hoc";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface Props {
  task: ITask;
  markTaskAsDone: (taskId: number, done: boolean) => void;
  activeCaseStore?: ActiveCaseStore;
}

const SortableItem = SortableElement(
  ({ task, markTaskAsDone, activeCaseStore }: Props) => {
    const [expanded, setExpanded] = useState(false);

    const [deleteTask] = useMutation(DELETE_A_TASK, {
      onCompleted: function() {
        message.success("Deleted the task");
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Could not delete the task",
          description: error.message
        });
      }
    });

    const [updateTask] = useMutation(UPDATE_TASK, {
      onCompleted: function() {
        message.success("Updated task");
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Failed to update task",
          description: error.message
        });
      }
    });

    return (
      <div style={{ borderBottom: "1px solid #1f1f1f" }}>
        <List.Item
          key={task.id}
          style={{ cursor: "grab", borderBottom: "none" }}
          actions={[
            <div>
              {expanded ? (
                <Tooltip title="Collapse row">
                  <Button
                    icon={<MinusSquareOutlined />}
                    style={{ border: "none" }}
                    onClick={() => setExpanded(false)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Expand row">
                  <Button
                    icon={<PlusSquareOutlined />}
                    style={{ border: "none" }}
                    onClick={() => setExpanded(true)}
                  />
                </Tooltip>
              )}
            </div>,
            <Tooltip title={`${task.commentCount} comment(s)`}>
              <MessageOutlined /> {task.commentCount}
            </Tooltip>,
            <Popover
              title="Assign task"
              content={
                <UserSelect
                  forAssigning={true}
                  value={task.assignedTo && task.assignedTo.username}
                  onChange={username =>
                    updateTask({
                      variables: {
                        input: {
                          taskId: task.id,
                          assignedTo: username
                        }
                      }
                    })
                  }
                />
              }
            >
              <Button style={{ border: "none" }} icon={<UserAddOutlined />} />
            </Popover>,
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
          ]}
        >
          <List.Item.Meta
            title={
              <>
                <Checkbox
                  style={{ marginRight: "1.0em" }}
                  defaultChecked={task.done}
                  onChange={event =>
                    markTaskAsDone(task.id, event.target.checked)
                  }
                />
                <a
                  onClick={() =>
                    navigate(getPathToATask(task.case.id, task.id))
                  }
                >
                  {truncateString(task.name, 75)}
                </a>
              </>
            }
            description={
              task.assignedTo && `Assigned to ${task.assignedTo.username}`
            }
          />
        </List.Item>
        {expanded && (
          <div
            style={{
              marginLeft: "24px",
              marginRight: "24px",
              marginBottom: "24px"
            }}
          >
            <DescriptionEditor
              initialValue={task.description}
              updateValue={newDescription =>
                updateTask({
                  variables: {
                    input: {
                      taskId: task.id,
                      description: newDescription
                    }
                  }
                })
              }
            />
          </div>
        )}
      </div>
    );
  }
);

export default inject("activeCaseStore")(observer(SortableItem));
