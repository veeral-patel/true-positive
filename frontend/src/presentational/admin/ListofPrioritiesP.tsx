import { List, Typography } from "antd";
import React from "react";
import IPriority from "ts/interfaces/IPriority";

const { Text } = Typography;

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
        <List.Item actions={[<a style={{ color: "red" }}>Remove</a>]}>
          <List.Item.Meta title={<Text editable>{priority.name}</Text>} />
        </List.Item>
      )}
    />
  );
};

export default ListofPrioritiesP;
