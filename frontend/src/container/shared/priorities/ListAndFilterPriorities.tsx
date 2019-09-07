import { Icon, Input, List, Spin } from "antd";
import { inject, observer } from "mobx-react";
import "presentational/shared/styles/hoverable_item.css";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import IPriority from "ts/interfaces/IPriority";

interface ListAndFilterPrioritiesProps {
  priorityStore?: PriorityStore;
}

interface ListAndFilterPrioritiesState {
  filterValue: string;
}

export default inject("priorityStore")(
  observer(
    class ListAndFilterPriorities extends React.Component<
      ListAndFilterPrioritiesProps,
      ListAndFilterPrioritiesState
    > {
      state = {
        filterValue: ""
      };

      render() {
        const { priorityStore } = this.props;
        const prioritiesAreLoading = priorityStore!.prioritiesAreLoading;
        const priorities = priorityStore!.priorities;
        const { filterValue } = this.state;

        return (
          <div>
            <div style={{ marginBottom: "10px" }}>
              <Input
                placeholder="Filter priorities"
                prefix={<Icon type="search" />}
                value={filterValue}
                onChange={event =>
                  this.setState({ filterValue: event.currentTarget.value })
                }
              />
            </div>

            {prioritiesAreLoading ? (
              <Spin />
            ) : (
              <div style={{ maxHeight: "20vh", overflow: "scroll" }}>
                <List<IPriority>
                  dataSource={priorities.filter(
                    priority =>
                      priority.name
                        .toLowerCase()
                        .indexOf(filterValue.toLowerCase()) !== -1
                  )}
                  renderItem={priority => (
                    <List.Item
                      className="hoverable_item"
                      style={{ padding: "3%" }}
                    >
                      {priority.name}
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
