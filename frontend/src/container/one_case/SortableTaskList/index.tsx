import { useMutation } from "@apollo/react-hooks";
import { message, notification } from "antd";
import { ApolloError } from "apollo-boost";
import arrayMove from "array-move";
import SortableList from "container/one_case/SortableTaskList/SortableList";
import { inject, observer } from "mobx-react";
import CHANGE_TASK_POSITION from "mutations/changeTaskPosition";
import React, { useState } from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";

interface Props {
  existingTasks: ITask[];
  activeCaseStore?: ActiveCaseStore;
}

function SortableComponent({ existingTasks, activeCaseStore }: Props) {
  const [orderedTasks, setOrderedTasks] = useState(existingTasks);

  const [changeTaskPosition] = useMutation(CHANGE_TASK_POSITION, {
    onCompleted: function() {
      message.success("Reordered tasks");
      activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Failed to reorder tasks",
        description: error.message
      });
      activeCaseStore!.loadActiveCase();
    }
  });

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    // exit if the "moved" task doesn't actually move
    if (oldIndex === newIndex) return;

    // reorder on the client optimistically
    setOrderedTasks(arrayMove(orderedTasks, oldIndex, newIndex));

    // reorder on the server
    changeTaskPosition({
      variables: {
        input: {
          id: orderedTasks[oldIndex].id,
          position: newIndex
        }
      }
    });
  };

  return (
    <SortableList
      orderedTasks={orderedTasks}
      onSortEnd={onSortEnd}
      markTaskAsDone={activeCaseStore!.markTaskAsDone}
    />
  );
}

export default inject("activeCaseStore")(observer(SortableComponent));
