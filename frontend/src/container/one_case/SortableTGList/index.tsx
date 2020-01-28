import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(() => {
  return (
    <li style={{ border: "1px solid black", padding: "2%" }}>Hello World</li>
  );
});

const SortableTGList = SortableContainer(() => {
  const items = [0, 1, 2].map(num => <SortableItem index={num} />);
  return <ul>{items}</ul>;
});

export default SortableTGList;
