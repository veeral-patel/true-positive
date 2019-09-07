import { Icon, Input, List, Spin } from "antd";
import { inject, observer } from "mobx-react";
import "presentational/shared/styles/hoverable_item.css";
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
              <Input
                placeholder="Filter statuses"
                prefix={<Icon type="search" />}
              />
            </div>

            {statusesAreLoading ? (
              <Spin />
            ) : (
              <div style={{ maxHeight: "20vh", overflow: "scroll" }}>
                <List<IStatus>
                  dataSource={statuses}
                  renderItem={status => (
                    <List.Item
                      className="hoverable_item"
                      style={{ padding: "3%" }}
                    >
                      {status.name}
                    </List.Item>
                  )}
                />
              </div>
            )}
          </div>
        );
      }
    }
  )
);
