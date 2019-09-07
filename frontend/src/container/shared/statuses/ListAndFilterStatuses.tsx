import { Input, List, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";
import IStatus from "ts/interfaces/IStatus";

interface ListAndFilterStatusesProps {
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class ListAndFilterStatuses extends React.Component<
      ListAndFilterStatusesProps
    > {
      render() {
        const { statusStore } = this.props;
        const statusesAreLoading = statusStore!.statusesAreLoading;
        const statuses = statusStore!.statuses;

        return (
          <div>
            <div style={{ marginBottom: "10px" }}>
              <Input placeholder="Filter statuses" />
            </div>

            {statusesAreLoading ? (
              <Spin />
            ) : (
              <div style={{ height: "20vh", overflow: "scroll" }}>
                <List<IStatus>
                  dataSource={statuses}
                  renderItem={status => <List.Item>{status.name}</List.Item>}
                />
              </div>
            )}
          </div>
        );
      }
    }
  )
);
