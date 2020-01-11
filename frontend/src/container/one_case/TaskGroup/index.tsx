import CreateTaskInput from "container/one_case/CreateTaskInput";
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
    <div style={{ marginBottom: "3em" }}>
      <div>
        <Heading heading={name} id={id} />
      </div>
      <div style={{ marginTop: "0.5em" }}>
        <CreateTaskInput handleEnter={() => void 0} />
      </div>
      <div style={{ marginTop: "1em" }}>
        <SortableTaskList existingTasks={tasks} />
      </div>
    </div>
  );
}

export default TaskGroup;
