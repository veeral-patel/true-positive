import { List } from "antd";
import SortableItem from "container/one_case/SortableTaskList/SortableItem";
import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import ITask from "ts/interfaces/ITask";

interface Props {
  markTaskAsDone: (taskId: number, done: boolean) => void;
  orderedTasks: ITask[];
}

const SortableList = SortableContainer(
  ({ markTaskAsDone, orderedTasks }: Props) => {
    return (
      <List<ITask>
        itemLayout="horizontal"
        dataSource={orderedTasks}
        bordered
        renderItem={(task, index) => (
          <SortableItem
            key={task.id}
            index={index}
            task={task}
            markTaskAsDone={markTaskAsDone}
          />
        )}
      />
    );
  }
);

export default SortableList;
