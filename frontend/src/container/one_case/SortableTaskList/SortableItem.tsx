import { navigate } from "@reach/router";
import { Checkbox, Icon, List, Tooltip } from "antd";
import React from "react";
import { SortableElement } from "react-sortable-hoc";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface Props {
  task: ITask;
  markTaskAsDone: (taskId: number, done: boolean) => void;
}

const SortableItem = SortableElement(({ task, markTaskAsDone }: Props) => (
  <List.Item style={{ cursor: "grab" }}>
    <List.Item.Meta
      title={
        <>
          <Checkbox
            style={{ marginRight: "1.0em" }}
            defaultChecked={task.done}
            onChange={event => {
              markTaskAsDone(task.id, event.target.checked);
            }}
          />
          <a onClick={() => navigate(getPathToATask(task.case.id, task.id))}>
            {truncateString(task.name, 75)}
          </a>
        </>
      }
      description={task.assignedTo && `Assigned to ${task.assignedTo.username}`}
    />
    <Tooltip title={`${task.commentCount} comment(s)`}>
      <Icon type="message" /> {task.commentCount}
    </Tooltip>
  </List.Item>
));
export default SortableItem;
