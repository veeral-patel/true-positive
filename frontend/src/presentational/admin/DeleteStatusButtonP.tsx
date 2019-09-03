import { Popconfirm, Typography } from "antd";
import React from "react";
import IStatus from "ts/interfaces/IStatus";

const { Text } = Typography;

interface DeleteStatusButtonProps {
  status: IStatus;
  deleteStatus: (id: number) => void;
}

const DeleteStatusButtonP: React.FC<DeleteStatusButtonProps> = ({
  status,
  deleteStatus
}) => (
  <Popconfirm
    title="Delete this status?"
    okText="Yes, Delete"
    onConfirm={() => deleteStatus(status.id)}
    cancelText="No"
  >
    <a style={{ color: "red" }}>Delete</a>
  </Popconfirm>
);

export default DeleteStatusButtonP;
