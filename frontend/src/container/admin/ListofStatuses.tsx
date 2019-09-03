import { Spin } from "antd";
import { inject, observer } from "mobx-react";
import ListofStatusesP from "presentational/admin/ListofStatusesP";
import React from "react";
import StatusStore from "stores/StatusStore";

interface IListofStatusProps {
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class ListofStatuses extends React.Component<IListofStatusProps> {
      componentDidMount() {
        const { statusStore } = this.props;
        statusStore!.loadStatuses();
      }

      render() {
        const { statusStore } = this.props;
        const isLoading = statusStore!.statusesAreLoading;

        if (isLoading) {
          return <Spin />;
        }

        const statuses = statusStore!.statuses;

        return (
          <ListofStatusesP
            statuses={statuses}
            deleteStatus={statusStore!.deleteStatus}
            handleItemChange={newValue => alert(newValue)}
          />
        );
      }
    }
  )
);
