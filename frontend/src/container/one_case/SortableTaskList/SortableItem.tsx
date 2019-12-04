import { navigate } from "@reach/router";
import { Checkbox, Icon, List, Tooltip } from "antd";
import React from "react";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface Props {
  task: ITask;
  markTaskAsDone: (taskId: number, done: boolean) => void;
}

function SortableItem({ task, markTaskAsDone }: Props) {
  return (
    <List.Item>
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
        description={
          task.assignedTo && `Assigned to ${task.assignedTo.username}`
        }
      />
      <Tooltip title={`${task.comments.length} comment(s)`}>
        <Icon type="message" /> {task.comments.length}
      </Tooltip>
    </List.Item>
  );
}

export default SortableItem;
