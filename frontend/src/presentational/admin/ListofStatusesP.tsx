import { List } from "antd";
import StatusItem from "container/admin/StatusItem";
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
      renderItem={status => <StatusItem status={status} />}
    />
  );
};

export default ListofStatusesP;
