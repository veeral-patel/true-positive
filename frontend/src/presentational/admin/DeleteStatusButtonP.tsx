import { Popconfirm, Typography } from "antd";
import React from "react";
import IStatus from "ts/interfaces/IStatus";

const { Text } = Typography;

interface Props {
  status: IStatus;
  deleteStatus: (statusName: string) => void;
}

const DeleteStatusButton: React.FC<Props> = ({ status, deleteStatus }) => (
  <Popconfirm
    title="Delete this status?"
    okText="Yes, Delete"
    onConfirm={() => deleteStatus(status.name)}
    cancelText="No"
  >
    <a style={{ color: "red" }}>Delete</a>
  </Popconfirm>
);

export default DeleteStatusButton;
