import { List } from "antd";
import { inject, observer } from "mobx-react";
import ListofPrioritiesP from "presentational/admin/ListofPrioritiesP";
import React from "react";
import PriorityStore from "stores/PriorityStore";

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
        return <ListofPrioritiesP priorities={priorities} />;
      }
    }
  )
);
