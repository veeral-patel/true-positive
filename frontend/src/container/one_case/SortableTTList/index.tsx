import { useMutation } from "@apollo/react-hooks";
import { notification } from "antd";
import arrayMove from "array-move";
import SortableList from "container/one_case/SortableTTList/SortableList";
import CHANGE_TASK_TEMPLATE_POSITION from "mutations/changeTaskTemplatePosition";
import React, { useState } from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import ITaskGroup from "ts/interfaces/ITaskGroup";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

interface Props {
  taskGroup: ITaskGroup;
  caseTemplate: ICaseTemplate;
  existingTTs: ITaskTemplate[];
  handleTTClicked: (id: number) => void;
  removeTaskTemplate: (taskTemplateId: number) => void;
}

function SortableComponent({
  existingTTs,
  handleTTClicked,
  taskGroup,
  caseTemplate,
  removeTaskTemplate
}: Props) {
  const [orderedTTs, setOrderedTTs] = useState(existingTTs);

  const [changeTaskTemplatePosition] = useMutation(
    CHANGE_TASK_TEMPLATE_POSITION,
    {
      onError: function(error) {
        notification.error({
          message: "Failed to reorder task templates",
          description: error.message
        });
      }
    }
  );

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
    setOrderedTTs(arrayMove(orderedTTs, oldIndex, newIndex));

    // reorder on the server
    changeTaskTemplatePosition({
      variables: {
        input: {
          taskTemplateId: orderedTTs[oldIndex].id,
          taskGroupId: taskGroup.id,
          position: newIndex
        }
      }
    });
  };

  return (
    <SortableList
      orderedTTs={orderedTTs}
      onSortEnd={onSortEnd}
      distance={3}
      handleTTClicked={handleTTClicked}
      taskGroup={taskGroup}
      caseTemplate={caseTemplate}
      removeTaskTemplate={removeTaskTemplate}
    />
  );
}

export default SortableComponent;
