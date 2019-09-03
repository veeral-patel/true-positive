import { List, Popconfirm } from "antd";
import PriorityItem from "container/admin/PriorityItem";
import React from "react";
import IPriority from "ts/interfaces/IPriority";

interface DeletePriorityButtonProps {
  priority: IPriority;
  deletePriority: (id: number) => void;
}

const DeletePriorityButton: React.FC<DeletePriorityButtonProps> = ({
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

// -------------

interface IListofPrioritiesProps {
  priorities: IPriority[];
  deletePriority: (id: number) => void;
}

const ListofPrioritiesP: React.FC<IListofPrioritiesProps> = ({
  priorities,
  deletePriority
}) => {
  return (
    <List<IPriority>
      itemLayout="horizontal"
      dataSource={priorities}
      renderItem={priority => (
        <List.Item>
          <PriorityItem priority={priority} />
        </List.Item>
      )}
    />
  );
};

export default ListofPrioritiesP;
