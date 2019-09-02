import { List } from "antd";
import React from "react";
import IStatus from "ts/interfaces/IStatus";

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
            <a>Rename</a>,
            <a style={{ color: "red" }} onClick={() => deleteStatus(status.id)}>
              Remove
            </a>
          ]}
        >
          <List.Item.Meta title={status.name} />
        </List.Item>
      )}
    />
  );
};

export default ListofStatusesP;
