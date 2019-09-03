import { Popconfirm, Typography } from "antd";
import React from "react";
import IPriority from "ts/interfaces/IPriority";

const { Text } = Typography;

interface DeletePriorityButtonProps {
  priority: IPriority;
  deletePriority: (id: number) => void;
}

const DeletePriorityButtonP: React.FC<DeletePriorityButtonProps> = ({
  priority,
  deletePriority
}) => (
  <Popconfirm
    title="Delete this priority?"
    okText="Yes, Delete"
    onConfirm={() => deletePriority(priority.id)}
    cancelText="No"
  >
    <a style={{ color: "red" }}>Delete</a>
  </Popconfirm>
);

export default DeletePriorityButtonP;
