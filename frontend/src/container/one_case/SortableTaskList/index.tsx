import arrayMove from "array-move";
import SortableList from "container/one_case/SortableTaskList/SortableList";
import React, { useState } from "react";
import ITask from "ts/interfaces/ITask";

interface Props {
  existingTasks: ITask[];
}

function SortableComponent({ existingTasks }: Props) {
  const [orderedTasks, setOrderedTasks] = useState(existingTasks);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setOrderedTasks(arrayMove(orderedTasks, oldIndex, newIndex));
  };

  return <SortableList orderedTasks={orderedTasks} onSortEnd={onSortEnd} />;
}

export default SortableComponent;
