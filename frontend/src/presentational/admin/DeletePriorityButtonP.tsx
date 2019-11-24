import { Button, Popconfirm } from "antd";
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
    <Button type="link" icon="delete" />
  </Popconfirm>
);

export default DeletePriorityButtonP;
