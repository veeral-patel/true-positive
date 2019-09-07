import { Icon, Input, List, Spin } from "antd";
import { inject, observer } from "mobx-react";
import "presentational/shared/styles/hoverable_item.css";
import React from "react";
import StatusStore from "stores/StatusStore";
import IStatus from "ts/interfaces/IStatus";
import { statusMatches } from "utils/filterCases";

interface ListAndFilterStatusesProps {
  statusStore?: StatusStore;
}

interface ListAndFilterStatusesState {
  filterValue: string;
}

export default inject("statusStore")(
  observer(
    class ListAndFilterStatuses extends React.Component<
      ListAndFilterStatusesProps,
      ListAndFilterStatusesState
    > {
      state = {
        filterValue: ""
      };

      render() {
        const { statusStore } = this.props;
        const statusesAreLoading = statusStore!.statusesAreLoading;
        const statuses = statusStore!.statuses;
        const { filterValue } = this.state;

        return (
          <div>
            <div style={{ marginBottom: "10px" }}>
              <Input
                placeholder="Filter statuses"
                prefix={<Icon type="search" />}
                value={filterValue}
                onChange={event =>
                  this.setState({ filterValue: event.currentTarget.value })
                }
              />
            </div>

            {statusesAreLoading ? (
              <Spin />
            ) : (
              <div style={{ maxHeight: "20vh", overflow: "scroll" }}>
                <List<IStatus>
                  dataSource={statuses.filter(status =>
                    statusMatches(filterValue, status)
                  )}
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
