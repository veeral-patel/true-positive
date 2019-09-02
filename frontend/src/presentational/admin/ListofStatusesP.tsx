import { List, Popconfirm, Typography } from "antd";
import React from "react";
import IStatus from "ts/interfaces/IStatus";

const { Text } = Typography;

// ---------

interface DeleteStatusButtonProps {
  status: IStatus;
  deleteStatus: (id: number) => void;
}

const DeleteStatusButton: React.FC<DeleteStatusButtonProps> = ({
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

// -------

interface IListofStatusesProps {
  statuses: IStatus[];
  deleteStatus: (id: number) => void;
}

const ListofStatusesP: React.FC<IListofStatusesProps> = ({
  statuses,
  deleteStatus
}) => {
  return (
    <List<IStatus>
      itemLayout="horizontal"
      dataSource={statuses}
      renderItem={status => (
        <List.Item
          actions={[
            <DeleteStatusButton status={status} deleteStatus={deleteStatus} />
          ]}
        >
          <List.Item.Meta title={<Text editable>{status.name}</Text>} />
        </List.Item>
      )}
    />
  );
};

export default ListofStatusesP;
