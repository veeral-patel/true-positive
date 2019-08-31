import { List } from "antd";
import React from "react";
import IPriority from "ts/interfaces/IPriority";

interface IListofPrioritiesProps {
  priorities: IPriority[];
}

const ListofPrioritiesP: React.FC<IListofPrioritiesProps> = ({
  priorities
}) => {
  return (
    <List<IPriority>
      itemLayout="horizontal"
      dataSource={priorities}
      renderItem={priority => (
        <List.Item
          actions={[<a>Rename</a>, <a style={{ color: "red" }}>Remove</a>]}
        >
          <List.Item.Meta title={priority.name} />
        </List.Item>
      )}
    />
  );
};

export default ListofPrioritiesP;
