import arrayMove from "array-move";
import SortableList from "container/one_case/SortableTTList/SortableList";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

interface Props {
  existingTTs: ITaskTemplate[];
  handleTTClicked: (id: number) => void;
}

function SortableComponent({ existingTTs, handleTTClicked }: Props) {
  const [orderedTTs, setOrderedTTs] = useState(existingTTs);

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
    alert("You cannot reorder task templates at the moment");
  };

  return (
    <SortableList
      orderedTTs={orderedTTs}
      onSortEnd={onSortEnd}
      distance={3}
      handleTTClicked={handleTTClicked}
    />
  );
}

export default SortableComponent;
