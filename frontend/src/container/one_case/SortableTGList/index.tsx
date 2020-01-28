import TaskGroup from "container/one_case/TaskGroup";
import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import ICase from "ts/interfaces/ICase";
import ITaskGroup from "ts/interfaces/ITaskGroup";

interface ItemProps {
  caseId: number;
  taskGroup: ITaskGroup;
}

const SortableTGItem = SortableElement(({ taskGroup, caseId }: ItemProps) => {
  return (
    <TaskGroup
      caseId={caseId}
      taskGroupId={taskGroup.id}
      name={taskGroup.name}
      tasks={taskGroup.tasks}
    />
  );
});

interface ListProps {
  theCase: ICase;
}

const SortableTGList = SortableContainer(({ theCase }: ListProps) => {
  const items = theCase.taskGroups.map((taskGroup, index) => (
    <SortableTGItem index={index} taskGroup={taskGroup} caseId={theCase.id} />
  ));
  return <div>{items}</div>;
});

export default SortableTGList;
