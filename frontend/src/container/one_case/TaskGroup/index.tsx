import SortableTaskList from "container/one_case/SortableTaskList";
import Heading from "container/one_case/TaskGroup/Heading";
import React from "react";
import ITask from "ts/interfaces/ITask";

interface Props {
  name: string;
  tasks: ITask[];
  id: number;
}

function TaskGroup({ name, tasks, id }: Props) {
  return (
    <>
      <Heading heading={name} id={id} />
      <SortableTaskList existingTasks={tasks} />
    </>
  );
}

export default TaskGroup;
