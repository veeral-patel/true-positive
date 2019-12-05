import SortableTaskList from "container/one_case/SortableTaskList";
import Heading from "container/one_case/TaskGroup/Heading";
import React from "react";
import ITask from "ts/interfaces/ITask";

interface Props {
  name: string;
  tasks: ITask[];
}

function TaskGroup({ name, tasks }: Props) {
  return (
    <>
      <Heading heading={name} />
      <SortableTaskList existingTasks={tasks} />
    </>
  );
}

export default TaskGroup;
