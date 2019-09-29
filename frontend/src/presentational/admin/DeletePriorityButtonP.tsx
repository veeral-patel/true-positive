import { Popconfirm } from "antd";
import React from "react";
import IPriority from "ts/interfaces/IPriority";

interface DeletePriorityButtonProps {
  priority: IPriority;
  deletePriority: (name: string) => void;
}

const DeletePriorityButtonP: React.FC<DeletePriorityButtonProps> = ({
  priority,
  deletePriority
}) => (
  <Popconfirm
    title="Delete this priority?"
    okText="Yes, Delete"
    onConfirm={() => deletePriority(priority.name)}
    cancelText="No"
  >
    <a style={{ color: "red" }}>Delete</a>
  </Popconfirm>
);

export default DeletePriorityButtonP;
