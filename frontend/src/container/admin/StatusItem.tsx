import { Button, List, Popconfirm, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";
import IStatus from "ts/interfaces/IStatus";

const { Text } = Typography;

interface StatusItemProps {
  status: IStatus;
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class StatusItem extends React.Component<StatusItemProps> {
      render() {
        const { status, statusStore } = this.props;

        return (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this status?"
                okText="Yes, Delete"
                onConfirm={() => statusStore!.deleteStatus(status.name)}
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
                    onChange: newText =>
                      statusStore!.renameStatus(status.name, newText)
                  }}
                >
                  {status.name}
                </Text>
              }
            />
          </List.Item>
        );
      }
    }
  )
);
