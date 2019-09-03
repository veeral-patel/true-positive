import { List } from "antd";
import PriorityItem from "container/admin/PriorityItem";
import React from "react";
import IPriority from "ts/interfaces/IPriority";

interface IListofPrioritiesProps {
  priorities: IPriority[];
  deletePriority: (id: number) => void;
}

const ListofPrioritiesP: React.FC<IListofPrioritiesProps> = ({
  priorities
}) => {
  return (
    <List<IPriority>
      itemLayout="horizontal"
      dataSource={priorities}
      renderItem={priority => <PriorityItem priority={priority} />}
    />
  );
};

export default ListofPrioritiesP;
