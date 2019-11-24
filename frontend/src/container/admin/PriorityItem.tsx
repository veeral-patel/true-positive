import { Button, List, Popconfirm, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import IPriority from "ts/interfaces/IPriority";

const { Text } = Typography;

interface PriorityItemProps {
  priority: IPriority;
  priorityStore?: PriorityStore;
}

export default inject("priorityStore")(
  observer(
    class PriorityItem extends React.Component<PriorityItemProps> {
      render() {
        const { priority, priorityStore } = this.props;

        return (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this priority?"
                okText="Yes, Delete"
                onConfirm={() => priorityStore!.deletePriority(priority.name)}
                cancelText="No"
              >
                <Button type="link" icon="delete" />
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={
                <Text
                  editable={{
                    onChange: newText => {
                      priorityStore!.renamePriority(priority.name, newText);
                    }
                  }}
                >
                  {priority.name}
                </Text>
              }
            />
          </List.Item>
        );
      }
    }
  )
);
