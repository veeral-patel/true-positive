import { List, Typography } from "antd";
import { inject, observer } from "mobx-react";
import DeleteStatusButton from "presentational/admin/DeleteStatusButtonP";
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
              <DeleteStatusButton
                status={status}
                deleteStatus={statusStore!.deleteStatus}
              />
            ]}
          >
            <List.Item.Meta
              title={
                <Text
                  editable={{
                    onChange: newText =>
                      statusStore!.renameStatus(status.id, newText)
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
