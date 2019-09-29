import { List, Typography } from "antd";
import { inject, observer } from "mobx-react";
import DeletePriorityButtonP from "presentational/admin/DeletePriorityButtonP";
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
              <DeletePriorityButtonP
                priority={priority}
                deletePriority={priorityStore!.deletePriority}
              />
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
