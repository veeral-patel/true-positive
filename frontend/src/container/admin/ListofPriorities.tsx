import { List } from "antd";
import PriorityItem from "container/admin/PriorityItem";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import IPriority from "ts/interfaces/IPriority";

interface IListofPriorityProps {
  priorityStore?: PriorityStore;
}

export default inject("priorityStore")(
  observer(
    class ListofPriorities extends React.Component<IListofPriorityProps> {
      componentDidMount() {
        const { priorityStore } = this.props;
        priorityStore!.loadPriorities();
      }

      render() {
        const { priorityStore } = this.props;
        const isLoading = priorityStore!.prioritiesAreLoading;

        if (isLoading) {
          return <List loading={true} />;
        }

        const priorities = priorityStore!.priorities;
        return (
          <List<IPriority>
            itemLayout="horizontal"
            dataSource={priorities}
            renderItem={priority => <PriorityItem priority={priority} />}
          />
        );
      }
    }
  )
);
