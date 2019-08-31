import { List } from "antd";
import React from "react";
import IStatus from "ts/interfaces/IStatus";

interface IListofStatusesProps {
  statuses: IStatus[];
}

const ListofStatusesP: React.FC<IListofStatusesProps> = ({ statuses }) => {
  return (
    <List<IStatus>
      itemLayout="horizontal"
      dataSource={statuses}
      renderItem={status => (
        <List.Item
          actions={[<a>Rename</a>, <a style={{ color: "red" }}>Remove</a>]}
        >
          <List.Item.Meta title={status.name} />
        </List.Item>
      )}
    />
  );
};

export default ListofStatusesP;
