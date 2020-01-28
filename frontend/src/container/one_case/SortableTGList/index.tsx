import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import TaskGroup from "../TaskGroup";

interface Props {
  char: string;
}

const SortableItem = SortableElement(({ char }: Props) => {
  return <TaskGroup caseId={20} taskGroupId={71} name={char} tasks={[]} />;
});

const SortableTGList = SortableContainer(() => {
  const items = ["A", "B", "C"].map((char, index) => (
    <SortableItem index={index} char={char} />
  ));
  return <ul>{items}</ul>;
});

export default SortableTGList;
