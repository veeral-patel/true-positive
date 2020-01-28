import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

interface Props {
  char: string;
}

const SortableItem = SortableElement(({ char }: Props) => {
  return (
    <li style={{ border: "1px solid black", padding: "2%" }}>Hello {char}</li>
  );
});

const SortableTGList = SortableContainer(() => {
  const items = ["A", "B", "C"].map((char, index) => (
    <SortableItem index={index} char={char} />
  ));
  return <ul>{items}</ul>;
});

export default SortableTGList;
