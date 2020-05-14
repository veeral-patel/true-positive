import { useMutation } from "@apollo/react-hooks";
import { notification } from "antd";
import arrayMove from "array-move";
import TaskGroup from "container/one_case/TaskGroup";
import { inject, observer } from "mobx-react";
import CHANGE_TASK_GROUP_POSITION from "mutations/changeTaskGroupPosition";
import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITaskGroup from "ts/interfaces/ITaskGroup";

// ---

interface SItemProps {
  caseId: number;
  taskGroup: ITaskGroup;
}

const SItem = SortableElement(({ taskGroup, caseId }: SItemProps) => {
  return (
    <TaskGroup
      caseId={caseId}
      taskGroupId={taskGroup.id}
      name={taskGroup.name}
      tasks={taskGroup.tasks}
    />
  );
});

// ---

interface SListProps {
  orderedTGs: ITaskGroup[];
  caseId: number;
}

const SList = SortableContainer(({ orderedTGs, caseId }: SListProps) => {
  const items = orderedTGs.map((taskGroup, index) => (
    <SItem index={index} taskGroup={taskGroup} caseId={caseId} />
  ));
  return <div>{items}</div>;
});

// --

interface Props {
  existingTGs: ITaskGroup[];
  activeCaseStore?: ActiveCaseStore;
}

function SortableTGList({ existingTGs, activeCaseStore }: Props) {
  const [orderedTGs, setOrderedTGs] = useState(existingTGs);

  const [changeTaskGroupPosition] = useMutation(CHANGE_TASK_GROUP_POSITION, {
    onError: function(error) {
      notification.error({
        message: "Failed to reorder task groups",
        description: error.message
      });
      activeCaseStore!.loadActiveCase();
    }
  });

  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    // exit if the "moved" task doesn't actually move
    if (oldIndex === newIndex) return;

    // reorder on the client optimistically
    setOrderedTGs(arrayMove(orderedTGs, oldIndex, newIndex));

    // reorder on the server
    changeTaskGroupPosition({
      variables: {
        input: {
          id: orderedTGs[oldIndex].id,
          position: newIndex
        }
      }
    });
  };

  const activeCase = activeCaseStore!.activeCase;
  if (activeCase) {
    return (
      <SList
        distance={3}
        onSortEnd={onSortEnd}
        orderedTGs={orderedTGs}
        caseId={activeCase.id}
      />
    );
  }

  return null;
}

export default inject("activeCaseStore")(observer(SortableTGList));
